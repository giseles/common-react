import { useState, useCallback } from 'react';
import { login } from './service';

export default () => {
  const [loading, setLoading] = useState(false);

  // 清空状态
  const toClear = useCallback(() => {
    setLoading(false);
  }, []);

  // 登录
  const toSubmit = useCallback(async (data, callback) => {
    setLoading(true);
    try {
      const res = await login(data);
      console.log(res);
      callback(res);
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
