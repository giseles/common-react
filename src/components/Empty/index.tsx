import React, { memo, useState } from 'react';
import { useDeepCompareEffect } from 'common-hook';
import { MidEmpty } from 'common-mid';
// import { MidEmpty } from './dfg'
import styles from './index.less';

export const Empty = memo(() => {
  const [resultProps, setResultProps] = useState({});
  const [tip, setTip] = useState({});
  const ablePathList = [];
  useDeepCompareEffect(() => {
    setResultProps({
      status: '404',
      title: '404',
      subTitle: '出错啦！您访问的页面没找到！',
    });

    if (ablePathList.includes('/home')) {
      setTip({
        back: '返回上一级',
        home: '回到首页',
        homeUrl: '/home',
      });
    } else {
      setTip({
        back: '返回上一级',
      });
    }
  }, [ablePathList]);

  return (
    <MidEmpty
      className={styles.layout}
      // Link={Link}
      resultProps={resultProps}
      tip={tip}
    />
  );
});
