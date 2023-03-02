import { axios, api } from '@/utils';

const { system } = api;

// 员工账号管理 API
export const apiList = async (data: any) =>
  axios.post(system + '/staff', { data });

export const apiAdd = async (data: any) =>
  axios.post(system + '/staff/add', { data });

export const apiEdit = async (data: any) =>
  axios.put(system + '/staff/update/' + data.id, { data });

export const apiDel = async (params: any) =>
  axios.delete(system + '/staff/' + params.id);
