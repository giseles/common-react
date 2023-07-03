import React, { useState, useCallback } from 'react'
import { Outlet, connect } from 'umi'
import { useDeepCompareEffect } from 'common-hook'
import { isNil } from 'common-screw'
import Header from '../Header'
import Sider from '../Sider'
import styles from './index.less'

const Model = (dva) => {
  return { ...dva.global }
}
export default connect(Model)((props) => {
  const { dispatch, pathname, pathHasPermissionList, menuList, breadcrumbList, ablePathList } =
    props
  const [collapsed, setCollapsed] = useState(false)
  useDeepCompareEffect(() => {
    // console.log('更新当前页面权限');
    if (isNil(pathHasPermissionList)) return

    const permissionsArr = pathHasPermissionList[pathname] || []
    let permissionList = {}
    for (const elem of permissionsArr) {
      permissionList[elem] = true
    }
    dispatch({
      type: 'global/toUpdate',
      payload: { permissionList }
    })
  }, [pathname, pathHasPermissionList])

  const toggle = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const toLoginOut = useCallback(() => {
    dispatch({
      type: 'common/toLogOut'
    })
  }, [])

  return (
    <div className={styles.layout}>
      <Sider collapsed={collapsed} menuList={menuList} toggle={toggle} pathname={pathname} />
      <div className={[styles.right, collapsed ? styles.rightClose : styles.rightOpen].join(' ')}>
        <Header
          collapsed={collapsed}
          toLoginOut={toLoginOut}
          toggle={toggle}
          pathname={pathname}
          breadcrumbList={breadcrumbList}
          ablePathList={ablePathList}
        />
        <div className={styles.scroll}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
})
