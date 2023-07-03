import { axios, api } from '@/utils'

const { enums, site, permission, warnConfig, role, detector } = api

// 获取枚举
export const apiBaseEnum = async () => axios.get(enums)

export const apiSiteEnum = async () => axios.get(site + '/list')

export const apiPermission = async (data) => axios.get(permission + '/tree/' + data.isFilter)

// 告警规则
export const apiWarnEnum = async () => axios.get(warnConfig + '/list')

// 角色列表
export const apiRoleEnum = async () => axios.get(role + '/list')

// 查询未绑定检测器列表
export const apiDetEnum = async (data) => axios.get(detector + '/list', { data })
