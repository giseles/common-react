import { useState, useCallback } from 'react';
import { storage as Storage } from 'common-screw';

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
      const { user, token, vendorId, type } = res.data;
      Storage.setItem('token', type + ' ' + token);
      Storage.setItem('user', { name: user });
      Storage.setItem('vendorId', vendorId);
      Storage.setItem('type', type);
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
