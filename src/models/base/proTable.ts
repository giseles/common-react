import { Message } from '@/components'
import { BaseReducer } from '@/utils'

export default {
  namespace: 'proTable',
  state: {
    searchParams: {
      page: 1,
      pageSize: 10
    },
    dataSource: [],
    apiList: {},
    loading: true,
    total: 0,
    base: {
      search: [],
      columns: []
    },
    sortList: {},
    formModal: { open: false },
    expBtn: null
  },

  effects: {
    // 初始
    *toInit({ payload }, { put }) {
      yield put({
        type: 'toUpdate',
        payload
      })
      yield put({ type: 'toList' })
    },
    // 获取列表
    *toList({ payload }, { call, put, select }) {
      yield put({
        type: 'toUpdate',
        payload: { loading: true }
      })
      try {
        const { searchParams, apiList } = yield select((_) => _.proTable)
        const search = { ...searchParams, ...payload }
        // 时间转换
        if (search.searchBgnTime) search.searchBgnTime = search.searchBgnTime + ' 00:00:00'
        if (search.searchEndTime) search.searchEndTime = search.searchEndTime + ' 23:59:59'

        const { data } = yield call(apiList.apiPage, search)
        yield put({
          type: 'toUpdate',
          payload: {
            dataSource: data.records,
            total: data.total,
            loading: false,
            searchParams: {
              ...search,
              page: data.current,
              pageSize: data.size
            }
          }
        })

        if (data.current > data.pages && data.pages > 0) {
          yield put({
            type: 'toList',
            payload: { page: data.pages }
          })
        }
      } catch (err) {
        yield put({
          type: 'toUpdate',
          payload: { loading: false }
        })
      }
    },
    // 删除
    *toDelete({ payload }, { call, put, select }) {
      const { apiList } = yield select((_) => _.proTable)
      const res = yield call(apiList.apiDel, payload)
      Message(res)
      yield put({ type: 'toList' })
    },
    // 启用禁用
    *toAble({ payload }, { call, put, select }) {
      const { apiList } = yield select((_) => _.proTable)
      const res = yield call(apiList.apiAble, payload)
      Message(res)
      yield put({ type: 'toList' })
    }
  },

  ...BaseReducer
}
