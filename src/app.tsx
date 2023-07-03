import { Message } from '@/components'

export const dva = {
  config: {
    // dva 全局错误处理，开启之后 loading 才会取消
    onError: (err) => {
      Message(err)
    },
    onReducer: (reducer) => (state, action) => {
      const stateLength = Object.keys(state).length
      const dvaInitStateLength = window.dvaInitState ? Object.keys(window.dvaInitState).length : 0

      if (stateLength > dvaInitStateLength) {
        window.dvaInitState = state
      }
      const newState = reducer(state, action)
      return { ...newState }
    }
  }
}
