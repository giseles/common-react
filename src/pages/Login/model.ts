import { useState, useEffect, useCallback } from 'react';
import { useAppData, history } from 'umi';
import { login } from './service';

export default () => {
  const [loading, setLoading] = useState(false);
  let pathname = useAppData().history.location.pathname;
  useEffect(() => {
    console.log(pathname);
    console.log('sdfsfsdaaa');
    return () => {
      console.log('离开');
    };
  }, [pathname]);

  // 清空状态
  const toClear = useCallback(() => {
    setLoading(false);
  }, []);

  // 登录
  const toSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log(res);
      console.log('sdfsfsd');
      history.push('/home');
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    toClear,
    toSubmit,
  };
};
