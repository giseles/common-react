import { BaseReducer } from '@/utils'
import { apiLogin } from './service'

export default {
  namespace: 'login',
  state: {
    loading: false
  },

  effects: {
    // 登录
    *toSubmit({ payload }, { call, put }) {
      yield put({
        type: 'toUpdate',
        payload: { loading: true }
      })
      try {
        const { data } = yield call(apiLogin, payload)
        yield put({
          type: 'common/toLogin',
          payload: data
        })
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
