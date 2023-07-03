import { storage as Storage, downToXlsx, isNil, toEnum } from 'common-screw'
import axios from 'axios'
import { Message } from '@/components'
import { toPush, BaseReducer, toMenuData, toPermissionTree } from '@/utils'
import {
  apiBaseEnum,
  apiDetEnum,
  apiPermission,
  apiRoleEnum,
  apiSiteEnum,
  apiWarnEnum
} from '@/services'

export default {
  namespace: 'common',
  state: {},

  effects: {
    // 还原对应model的初始状态
    *toReset({ payload }, { put }) {
      const { name } = payload
      const initState = window.dvaInitState[name]
      if (!initState) return
      yield put({
        type: `${name}/toUpdate`,
        payload: initState
      })
    },
    // 显示Message
    *toMessage({ payload }, { put }) {
      yield put({
        type: 'global/toUpdate',
        payload: { message: payload }
      })
    },
    // 页面跳转
    *toPush({ payload }) {
      const { pathname, data } = payload
      yield toPush(pathname, data)
    },
    // 登录成功
    *toLogin({ payload }, { put }) {
      const data = payload
      Storage.setItem('token', data.tokenType + data.accessToken)
      Storage.setItem('loginName', data.username)
      yield put({
        type: 'global/toInit',
        payload: { path: '/login' }
      })
    },
    // 登出
    *toLogOut() {
      Storage.removeItem('token')
      Storage.removeItem('loginName')
      yield toPush('/login')
    },
    // 导出表格
    *toExport({ payload }) {
      const { name, api, searchParams } = payload
      yield axios
        .get(api, {
          params: searchParams,
          cache: true,
          contentType: 'application/json',
          responseType: 'blob',
          getResponse: true,
          Authorization: Storage.getItem('token')
        })
        .then((res) => {
          if (res.data.code) {
            Message(res.data)
          } else {
            downToXlsx(res.data, name)
          }
        })
    },

    // 获取菜单
    *toMenu({ payload }, { put, call }) {
      const { data } = yield call(apiPermission, { isFilter: 0 })
      const { path } = payload
      const baseConfig = {
        name: 'name',
        icon: 'icon',
        path: 'url',
        children: 'children',
        isHide: ({ url, isMenu }) => Boolean(url && !isMenu)
      }
      const {
        menuList, // 菜单数据
        pathHasPermissionList, // 路由所拥有功能权限
        breadcrumbList, // 面包屑数据
        ablePathList, // 可访问页面
        fistPath // 第一个有效路由
      } = toMenuData(data, baseConfig)
      if (['/', '/login'].includes(path)) {
        toPush(fistPath)
      }
      yield put({
        type: 'global/toUpdate',
        payload: {
          menuList,
          pathHasPermissionList,
          breadcrumbList,
          ablePathList
        }
      })
    },
    // 获取权限树
    *toPerTree({}, { put, call }) {
      const { data } = yield call(apiPermission, { isFilter: 1 })
      yield put({
        type: 'global/toUpdate',
        payload: { permissionTree: toPermissionTree(data) }
      })
    },
    // 获取枚举
    *getEnum({ payload = {} }, { call, put, select }) {
      let { type, ...rest } = payload
      if (isNil(type)) type = ['base', 'site']
      const { baseEnum: initEum } = yield select((_) => _.global)
      let baseEnum = { ...initEum }

      // 基础枚举
      if (type.includes('base')) {
        const { data } = yield call(apiBaseEnum)
        baseEnum = { ...baseEnum, ...data }
      }
      // 站点
      if (type.includes('site')) {
        const { data } = yield call(apiSiteEnum)
        const siteAbleList = {}
        data.forEach((_) => {
          if (_.status === 1) siteAbleList[_.id] = _.name
        })
        baseEnum.siteList = toEnum(data, 'id', 'name')
        baseEnum.siteAbleList = siteAbleList
      }
      // 角色
      if (type.includes('role')) {
        const { data } = yield call(apiRoleEnum)
        baseEnum.roleList = toEnum(data, 'id', 'name')
      }
      // 未绑定检测器
      if (type.includes('det')) {
        const { data } = yield call(apiDetEnum, rest)
        baseEnum.detList = toEnum(data, 'id', 'sn')
      }
      // 告警规则
      if (type.includes('warn')) {
        const { data } = yield call(apiWarnEnum)
        baseEnum.warnList = toEnum(data, 'id', 'name')
        baseEnum.warnDes = toEnum(data, 'id', 'warningDes')
      }

      yield put({
        type: 'global/toUpdate',
        payload: { baseEnum }
      })
    },
    // 发送请求 BASE
    *toRequest({ payload, callback }, { call }) {
      const { api, item } = payload
      const { data } = yield call(api, item)
      callback?.(data)
    },
    // 发送请求 并提示
    *toRequestTip({ payload, callback }, { call }) {
      const { api, item } = payload
      const res = yield call(api, item)
      Message(res)
      callback?.(res)
    }
  },
  ...BaseReducer
}
