import React, { memo } from 'react';
import { Avatar, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import { storage as Storage } from 'common-screw';
import styles from './index.less';

const Header = (props: any) => {
  const { toLoginOut } = useModel('global');
  const { collapsed } = props;

  const userMenu: any = [
    {
      label: '退出',
      key: 'signOut',
      icon: <ExportOutlined />,
    },
  ];
  const onChangeUserMenu = (e: any) => {
    toLoginOut();
  };

  return (
    <div className={styles.header} style={{ padding: 0 }}>
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
              sss
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
