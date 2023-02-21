import React, { memo } from 'react';
import { Layout, Avatar, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons';
// import { storage as Storage } from 'common-screw';
import styles from './index.less';

const LayoutHeader = (props: any) => {
  const { collapsed } = props;

  const userMenu: any = [
    {
      label: '个人信息',
      key: 'info',
      icon: <UserOutlined />,
    },
    {
      label: '登出',
      key: 'signOut',
      icon: <ExportOutlined />,
    },
  ];
  const onChangeUserMenu = (e: any) => {
    if (e.key === 'info') {
    } else if (e.key === 'signOut') {
    }
  };
  const onChangeLanguage = (e: any) => {
    // dispatch({
    //   type: 'global/setLocale',
    //   payload: { currentLocale: e.key },
    // });
  };

  return (
    <>
      <Layout.Header className={styles.header} style={{ padding: 0 }}>
        <div
          className={styles.left}
          style={collapsed ? {} : { width: 'calc(100% - 250px)' }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} />
          )}
          <div className={styles.right}>
            <Dropdown
              menu={{ items: userMenu, onClick: onChangeUserMenu }}
              placement="bottom"
              className={styles.dropdown}
            >
              <div>
                <Avatar className={styles.avatar}>S</Avatar>
                {'wahaha'}
              </div>
            </Dropdown>
          </div>
        </div>
      </Layout.Header>
    </>
  );
};

export default memo(LayoutHeader);
