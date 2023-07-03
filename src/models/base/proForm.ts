import { Message } from '@/components'
import { BaseReducer } from '@/utils'
import { isNumber, toString } from 'common-screw'

export default {
  namespace: 'proForm',
  state: {
    loading: false,
    spinning: true,
    initialValues: {},
    column: []
  },

  effects: {
    *toDetail({ payload }, { call, put }) {
      const { api, item, toDetail } = payload
      const { data } = yield call(api, item)
      const initInfo: any = {}
      Object.keys(data).forEach((key: any) => {
        const value = data[key]
        initInfo[key] = isNumber(value) ? toString(value) : value
      })
      yield put({
        type: 'toUpdate',
        payload: {
          spinning: false,
          initialValues: toDetail ? toDetail(initInfo) : initInfo
        }
      })
    },
    // 提交
    *toSubmit({ payload, callback }, { put, call }) {
      try {
        const { api, data } = payload
        const res = yield call(api, data)
        Message(res)
        callback?.(res)
      } catch (err) {
        yield put({
          type: 'toUpdate',
          payload: { loading: false }
        })
      }
    }
  },
  ...BaseReducer
}
