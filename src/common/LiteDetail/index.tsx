/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react';
import { useModel } from 'umi';
import { useDeepCompareEffect } from 'common-hook';
import { PageHeader, Description } from '@/components';
import styles from './index.module.less';

export default (props: any) => {
  const {
    back,
    title,
    subTitle = '详情',
    descProps,
    column,
    dataSource,
    apiList,
  } = props;
  const { initList } = useModel('global');

  const headerProps = { back, title, subTitle };
  const descriptionProps = {
    descProps,
    column,
    dataSource: { ...dataSource, ...initList },
  };

  useEffect(() => {
    return () => {
      // dispatch({
      //   type: 'common/resetState',
      //   payload: { namespace: 'liteDetail' },
      // });
    };
  }, [dispatch]);

  useDeepCompareEffect(() => {
    // 获取详情
    // apiList &&
    //   apiList.detail &&
    // dispatch({
    //   type: 'liteDetail/init',
    //   payload: {
    //     api: apiList.detail,
    //     item: dataSource,
    //   },
    // });
  }, [apiList, dataSource]);

  return (
    <div className={styles.wrap}>
      <PageHeader {...headerProps} />
      <Description {...descriptionProps} type="detail" />
    </div>
  );
};
