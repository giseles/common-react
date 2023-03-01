import React, { useState, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import LayoutHeader from '@/components/LayoutHeader';
import LayoutSider from '@/components/LayoutSider';
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
            <Button type="primary">Button</Button>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <var>
                {' '}
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/404">Docs</Link>
                </li>
                <li>
                  <Link to="/login">login</Link>
                </li>
                v
              </var>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
