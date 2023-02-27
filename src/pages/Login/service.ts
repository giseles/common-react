import { axios } from '@/utils';

export const login = async (data: any) => axios.post('/api/auth', { data });
