import React, { memo } from 'react'
import { useIntl } from 'umi'
import { Avatar, Dropdown } from 'antd'
import {
  ExportOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { storage as Storage } from 'common-screw'
import { Breadcrumb } from '@/components'
import styles from './index.less'
import { toPush } from '@/utils'

export default memo((props: any) => {
  const intl = useIntl()
  const { collapsed, pathname, toLoginOut, breadcrumbList, ablePathList, toggle } = props
  const userMenu: any = [
    {
      label: '个人中心',
      key: 'info',
      icon: <UserOutlined />
    },
    {
      label: intl.formatMessage({ id: 'logOut' }),
      key: 'signOut',
      icon: <ExportOutlined />
    }
  ]
  const onChangeUserMenu = (e) => {
    if (e.key === 'info') {
      toPush('/info')
    } else if (e.key === 'signOut') {
      toLoginOut()
    }
  }

  return (
    <div className={styles.header} style={{ padding: 0 }}>
      <div className={styles.left}>
        {collapsed ? (
          <MenuUnfoldOutlined className={styles.trigger} onClick={() => toggle()} />
        ) : (
          <MenuFoldOutlined className={styles.trigger} onClick={() => toggle()} />
        )}
        <Breadcrumb
          pathname={pathname}
          breadcrumbList={breadcrumbList}
          ablePathList={ablePathList}
        />
        {/* <SelectLang /> */}
        <div className={styles.right}>
          <Dropdown
            menu={{ items: userMenu, onClick: onChangeUserMenu }}
            placement="bottom"
            className={styles.dropdown}
          >
            <div>
              <Avatar className={styles.avatar}>{Storage.getItem('loginName')[0] || ''}</Avatar>
              {Storage.getItem('loginName') || ''}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
})
