import { useState, useCallback } from 'react';

export default () => {
  const initState = { menuList: 'wahhhahhh' };
  const [state, setState] = useState<any>(initState);
  const ddd = 'sdfsdfsdfsdfsdf ';
  return {
    ddd,
    ...state,
  };
};
