import React, { useState, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'umi';
import { Button } from 'antd';
import LayoutHeader from '@/components/LayoutHeader';
import LayoutSider from '@/components/LayoutSider';
import styles from './index.less';

export default () => {
  const [collapsed, setCollapsed] = useState(true);
  let location = useLocation();
  const { pathname } = location;

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
