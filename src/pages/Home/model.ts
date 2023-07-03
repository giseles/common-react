import { BaseReducer } from '@/utils'
import { apiData, apiSite } from './service'

export default {
  namespace: 'home',
  state: {
    dataList: {},
    siteList: [],
    activeId: '',
    dataSource: [],
    loading: true,
    refresh: 0
  },

  effects: {
    *toInit({}, { call, put, all }) {
      const [{ data }, { data: site }] = yield all([call(apiData), call(apiSite)])
      const siteList = []
      site.forEach((_) => {
        const { id, name, number, antennaNum, antennaStatus, exceptionNum } = _
        siteList.push({
          id,
          name,
          number,
          antennaNum,
          antennaStatus,
          exceptionNum,
          position:
            _.longitude && _.latitude ? [parseFloat(_.longitude), parseFloat(_.latitude)] : null
        })
      })
      yield put({
        type: 'toUpdate',
        payload: { dataList: data, siteList, loading: false }
      })
    }
  },
  ...BaseReducer
}
