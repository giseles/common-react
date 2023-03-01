import React, { memo } from 'react';
import { useModel, Link } from 'umi';

import { IconFont } from '@/components';
import { MidBreadcrumb } from 'common-mid';
import styles from './index.module.less';

export const Breadcrumb = memo((props: any) => {
  const { breadcrumbList, ablePathList } = useModel('global');
  const { pathname } = props;
  const breadProps = {
    separator: '/',
  };
  const baseProps = {
    isShowIcon: false,
    homeName: '首页',
    homeUrl: '/home',
    homeIcon: 'icon-menu-sy1',
  };
  const specialList = {
    noJumpList: {
      form: null,
      detail: '详情',
    },
    jumpList: {
      ec: null,
      oc: null,
      sc: null,
      employee: '/sc/employee/role',
      content: '/oc/content/notice',
    },
    noShowList: ['home'],
  };
  const componentProps = {
    Link,
    IconFont,
  };

  return (
    <MidBreadcrumb
      className={styles.antdBread}
      componentProps={componentProps}
      breadProps={breadProps}
      baseProps={baseProps}
      specialList={specialList}
      pathname={pathname}
      pathInfo={breadcrumbList}
      pathShowList={ablePathList}
    />
  );
});
