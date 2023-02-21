import React, { useState, memo, useEffect } from 'react';
import { Link } from 'umi';
import { Layout } from 'antd';
import { isNil } from 'common-screw';
// import { IconFont } from '@/components';
import styles from './index.module.less';

const LayoutSider = ({ ...props }) => {
  const { collapsed, pathname, toggle } = props;
  const pathSnippets = pathname.split('/').filter((i: any) => i);
  const [hoverList, setHoverList]: any = useState(null);
  const iconEnter = (item?: any) => {};
  const jumpHome = (isHome?: any) => {};

  const mouseMove = (e: any) => {
    if (e.clientX > 85 + 250) {
      // hoverList.path !== '/home' && !collapsed && toggle()
      setTimeout(setHoverList(null), 500);
    }
  };
  useEffect(() => {
    // if (!isNil(hoverList)) {
    //   window.addEventListener('mousemove', mouseMove);
    // } else {
    //   window.removeEventListener('mousemove', mouseMove);
    // }
    // return () => {
    //   // useEffect卸载时解绑
    //   window.removeEventListener('mousemove', mouseMove);
    // };
  }, [hoverList]);

  return (
    <>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
        // onMouseLeave={boxLeave}
      >
        <div className={styles.logo} />
        <div className={styles.menu}>
          {[].map((item: any) => {
            const active = '/' + pathSnippets[0] === item.path;
            return (
              <div
                key={item.path}
                className={[styles.menu1, active && styles.active]}
                onMouseEnter={() => iconEnter(item)}
                onClick={() => jumpHome(item.path === '/home')}
              >
                {/* <IconFont
                  type={`${item.icon}${'-02'}`}
                  style={{ color: '#fff' }}
                /> */}
                {item.name}
              </div>
            );
          })}
        </div>
      </Layout.Sider>
      <div
        className={styles.hoverBox}
        style={{
          visibility: hoverList && !collapsed ? 'visible' : 'hidden',
          opacity: hoverList && !collapsed ? '1' : '0',
          left: hoverList && !collapsed ? 85 : -165,
        }}
      >
        <div className={styles.title}>{hoverList?.name + '中心'}</div>
        <div className={styles.content}>
          {hoverList &&
            hoverList.children?.map((item: any) => {
              const children = item.children;
              return (
                <div key={item.path}>
                  <h4>{item.name}</h4>
                  {children?.map((_: any) => {
                    return (
                      <Link
                        to={_.path}
                        key={_.path}
                        className={
                          pathname.includes(_.path) ? styles.active : ''
                        }
                      >
                        {_.name}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default memo(LayoutSider);
