import { useState, useEffect, useCallback } from 'react';
import { useAppData } from 'umi';

export default () => {
  const [count, setCount] = useState(0);
  let pathname = useAppData().history.location.pathname;
  useEffect(() => {
    console.log(pathname);
    console.log('sdfsfsdaaa');
    return () => {
      console.log('离开');
    };
  }, [pathname]);
  // 增加数量
  const addCount = useCallback((val: number = 1) => {
    setCount((pre) => {
      return pre + val;
    });
  }, []);

  // 减少数量
  const substractCount = useCallback((val: number = 1) => {
    setCount((pre) => {
      return pre - val;
    });
  }, []);

  // 增加数量
  const toClear = useCallback(() => {
    setCount(0);
  }, []);

  return {
    count,
    addCount,
    substractCount,
    toClear,
  };
};
