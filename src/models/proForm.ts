import { useState, useCallback } from 'react';
import { Message } from '@/components';

export default () => {
  const initState = {
    loading: false,
  };
  const [state, setState] = useState<any>(initState);

  // 更新状态
  const toUpdate = useCallback(
    (data) => {
      setState({
        ...state,
        ...data,
      });
    },
    [state],
  );

  // 重置状态
  const toClear = useCallback(() => {
    setState(initState);
  }, [initState]);

  // 提交
  const toSubmit = useCallback(async (payload, callback) => {
    try {
      const { apiList, ...restPayload } = payload;
      const res = await apiList.list(restPayload);
      Message(res);
      callback?.(res);
    } catch (err) {
      toUpdate({ loading: false });
    }
  }, []);

  return {
    ...state,
    toUpdate,
    toClear,
    toSubmit,
  };
};
