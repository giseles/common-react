import React, { useState, memo, useEffect } from 'react';
import { isNil } from 'common-screw';
import { Link, useModel } from 'umi';
import { IconFont } from '@/components';
import styles from './index.less';

const Sider = ({ ...props }) => {
  const { collapsed, pathname, toggle } = props;
  const { menuList } = useModel('global');
  const pathSnippets = pathname.split('/').filter((i: any) => i);
  const [hoverList, setHoverList]: any = useState(null);
  const menuMain = ['/home', '/team', '/project', '/task'];
  const iconEnter = (item?: any) => {};
  const jumpHome = (path?: any) => {};

  useEffect(() => {
    if (!isNil(hoverList)) {
      window.addEventListener('mousemove', mouseMove);
    } else {
      window.removeEventListener('mousemove', mouseMove);
    }
    return () => {
      // useEffect卸载时解绑
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [hoverList]);

  const mouseMove = (e: any) => {
    // console.log(e.clientX)
    if (e.clientX > 85 + 250) {
      hoverList.path !== '/home' && !collapsed && toggle();
      setTimeout(setHoverList(null), 500);
    }
  };

  return (
    <>
      <div className={styles.sider}>
        <div className={styles.logo} />
        <div className={styles.menu}>
          {menuList.map((item: any) => {
            const active = '/' + pathSnippets[0] === item.path;
            return (
              <div
                key={item.path}
                className={[styles.menu1, active && styles.active]}
                onMouseEnter={() => iconEnter(item)}
                onClick={() => jumpHome(item.path)}
              >
                <IconFont
                  type={`${item.icon}${'-02'}`}
                  style={{ color: '#fff' }}
                />
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
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
              return (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    key={item.path}
                    className={
                      pathname.includes(item.path) ? styles.active : ''
                    }
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default memo(Sider);
