import React, { memo } from 'react'
import { useSelector, router } from 'dva'
import { IconFont } from 'componentTs'
import { MidBreadcrumb } from 'common-mid'
import styles from './index.module.less'

const { Link } = router
export const Breadcrumb = memo((props: any) => {
  const { breadcrumbList, ablePathList, intl } = useSelector(({ global }: any) => global)
  const { pathname } = props
  const breadProps = {
    separator: '/'
  }
  const baseProps = {
    isShowIcon: false,
    homeName: intl.get('MENU_HOME'),
    homeUrl: '/home',
    homeIcon: 'icon-menu-sy1'
  }
  const specialList = {
    noJumpList: {
      // form: intl.get('BASE_FORM'),
      form: null,
      info: intl.get('HEAD_PROFILE'),
      add: intl.get('BASE_ADD'),
      edit: intl.get('BASE_EDIT'),
      detail: intl.get('BASE_DETAIL')
    },
    jumpList: {
      ec: null,
      oc: null,
      sc: null,
      employee: '/sc/employee/role',
      content: '/oc/content/notice'
    },
    noShowList: ['home']
  }
  const componentProps = {
    Link,
    IconFont
  }

  return (
    <MidBreadcrumb
      className={styles.antdBread}
      componentProps={componentProps}
      breadProps={breadProps}
      baseProps={baseProps}
      specialList={specialList}
      pathname={pathname}
      pathInfo={breadcrumbList}
      pathShowList={ablePathList}
    />
  )
})
