// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [state, setState] = useState<string>({ menuList: [] });
  return {
    ...state,
  };
};

export default useUser;
