import { BaseReducer } from '@/utils'

export default {
  namespace: 'proDesc',
  state: {
    spinning: true,
    column: [],
    dataSource: {}
  },

  effects: {
    *toDetail({ payload }, { call, put }) {
      const { api, item } = payload
      const { data: dataSource } = yield call(api, item)
      yield put({
        type: 'toUpdate',
        payload: {
          spinning: false,
          dataSource
        }
      })
    }
  },
  ...BaseReducer
}
