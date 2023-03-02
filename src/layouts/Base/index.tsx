import React, { useState, useCallback } from 'react';
import { Outlet, useLocation, useModel } from 'umi';
import { useDeepCompareEffect } from 'common-hook';

import LayoutHeader from '@/components/LayoutHeader';
import LayoutSider from '@/components/LayoutSider';
import styles from './index.less';

export default () => {
  const { pathHasPermissionList, toUpdate } = useModel('global');
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation();

  useDeepCompareEffect(() => {
    // console.log('更新当前页面权限');
    const permissionsArr = pathHasPermissionList[pathname] || [];
    let permissionList = {};
    for (const elem of permissionsArr) {
      permissionList[elem] = true;
    }
    toUpdate({ permissionList });
  }, [pathname, pathHasPermissionList]);

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <div className={styles.layout}>
      <LayoutSider collapsed={collapsed} toggle={toggle} pathname={pathname} />
      <div className={styles.right}>
        <LayoutHeader
          collapsed={collapsed}
          toggle={toggle}
          pathname={pathname}
        />
        <div className={styles.scroll}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
