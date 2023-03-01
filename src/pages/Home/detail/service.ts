import { api, axios } from '@/utils';

const { operate, dvc } = api;

// 说明书 API
export const apiList = async (data: any) =>
  axios.post(operate + '/manual', { data });

export const apiDel = async (params: any) =>
  axios.delete(operate + '/manual/' + params.id);

export const apiAble = async (data: any) =>
  axios.post(operate + `/manual/${data.id}/${data.operation}`);

export const apiAdd = async (data: any) =>
  axios.post(operate + '/manual/addOrUpdate', { data });

// 获取车型列表
export const carEnums = async (data: any) => axios.get(dvc + '/allEnum', null);
