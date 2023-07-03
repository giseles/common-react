import { storage as Storage } from 'common-screw'
import { BaseReducer, toPush } from '@/utils'

export default {
  namespace: 'global',
  state: {
    message: { time: 0 }, // message提示
    menuList: [], // 菜单数据
    permissionTree: [], // 菜单权限树
    pathHasPermissionList: {}, // 路由所拥有功能权限
    breadcrumbList: {}, // 面包屑数据
    ablePathList: [], // 可访问页面
    permissionList: {}, // 当前页面权限
    baseEnum: { warningPeriod: {} }, // 常用枚举
    urlHistory: [] // URL历史,刷新页面后重置
  },
  subscriptions: {
    setup({ history, dispatch }) {
      const { pathname, search } = history.location
      const path = pathname + search
      const token = Storage.getItem('token')
      if (token) {
        // 登录状态时 初始化基本数据
        dispatch({ type: 'toInit', payload: { path } })
        dispatch({ type: 'toHistory', payload: { path } })
      } else {
        // 没有token 跳转登录页
        toPush('/login')
      }
    },
    // 监听URL
    watchUrl({ dispatch, history }) {
      return history.listen(({ location }) => {
        const { pathname, search } = location
        dispatch({
          type: 'toHistory',
          payload: { path: pathname + search }
        })
      })
    }
  },
  effects: {
    // 初始化基本数据
    *toInit({ payload }, { put }) {
      const { path } = payload
      yield put({ type: 'common/toMenu', payload: { path } })
      yield put({ type: 'common/getEnum' })
      // yield put({ type: 'common/getCity' })
    },
    // 记录URL历史
    *toHistory({ payload }, { put, select }) {
      const { urlHistory } = yield select((_) => _.global)
      const { path } = payload
      if (path !== urlHistory[0]) {
        yield put({
          type: 'toUpdate',
          payload: { urlHistory: [path, ...urlHistory].slice(0, 2) }
        })
      }
    }
  },
  ...BaseReducer
}
