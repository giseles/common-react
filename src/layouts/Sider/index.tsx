import React, { useState, memo } from 'react'
import { Menu } from 'antd'
import { useDeepCompareEffect } from 'common-hook'
import { toPush } from '@/utils'
import styles from './index.less'

export default memo((props: any) => {
  const { collapsed, pathname, menuList: initMenuList } = props
  const [menuList, setMenuList] = useState([])
  const [openKeys, setOpenKeys] = useState('')
  const [selectedKeys, setSelectedKeys] = useState('')
  const rootKeys = ['/monitor', '/alarm', '/system']

  useDeepCompareEffect(() => {
    setSelectedKeys(pathname)
    for (let i = 0, len = rootKeys.length; i < len; i++) {
      if (pathname.includes(rootKeys[i])) {
        setOpenKeys(rootKeys[i])
        break
      }
    }
  }, [pathname, rootKeys])

  useDeepCompareEffect(() => {
    toMenu(initMenuList, selectedKeys)
  }, [initMenuList, selectedKeys])

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1])
  }

  const toMenu = (list, selectedKeys) => {
    const menu = []
    list.forEach((_) => {
      const children = []
      _.children?.forEach((item) => {
        if (!item.isHide) {
          children.push({
            key: item.path,
            label: item.name,
            icon: <div className={styles.dot} />
          })
        }
      })
      menu.push({
        key: _.path,
        label: _.name,
        children: children.length > 0 ? children : null,
        icon: (
          <div
            className={[
              styles.icon,
              selectedKeys.includes(_.path) ? styles[_.icon + 's'] : styles[_.icon]
            ].join(' ')}
          />
        )
      })
    })
    setMenuList(menu)
  }

  const onClick = (e) => {
    if (!e.key.includes(openKeys)) {
      setOpenKeys('')
    }
    toPush(e.key)
  }

  return (
    <div className={[styles.sider, collapsed ? styles.siderClose : styles.siderOpen].join(' ')}>
      <div className={styles.logo}></div>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        openKeys={[openKeys]}
        onOpenChange={onOpenChange}
        onClick={onClick}
        selectedKeys={[selectedKeys]}
        items={menuList}
      />
    </div>
  )
})
