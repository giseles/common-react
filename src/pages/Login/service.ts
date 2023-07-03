import { axios, api } from '@/utils'

const { login } = api

// 登录 API
export const apiLogin = async (data: any) => axios.post(login, { data })
