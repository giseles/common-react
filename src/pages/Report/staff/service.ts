import { axios, api } from '@/utils';

const { system } = api;

// 项目工时统计报表 API
export const apiList = async (data: any) =>
  axios.post(system + '/staff', { data });

export const apiExp = async (data: any) =>
  axios.post(system + '/staff/add', { data });
