import { api, axios } from '@/utils'

const { home, site } = api

// 首页 API

export const apiData = async () => axios.get(home + '/data')

// 站点 分页
export const apiPage = async (data) => axios.get(site + '/pages', { data })

// 站点 列表
export const apiSite = async () => axios.get(site + '/list?status=1')
