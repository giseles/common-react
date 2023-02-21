import React, { memo } from 'react'
import { useSelector } from 'dva'
import { MidTable } from 'common-mid'
// import { MidTable } from './d'
import styles from './index.module.less'

// const permissionListDefault: any = {
//   detail: true,
//   edit: true,
//   del: true,
//   gps: true,
//   enable: true,
//   disable: true
// }

// {
//   title: '操作',
//   fixed: 'right',
//   key: 'operate',
//   isHide: true,
//   btnList: [
//     {
//       name: '车辆信息',
//       isShow: true,
//       type: 'dd',
//       onClick: (type: any, item: any) => {
//         console.log(type)
//         console.log(item)
//       }
//     }
//   ]
// }

export const Table = memo((props: any) => {
  const { permissionList } = useSelector((_: any) => _.common)
  const { intl, language } = useSelector((_: any) => _.global)
  const { current, pageSize, total, selection, onHandleAll, showPage = true, ...restProps } = props

  const btnProps = { type: 'link', size: 'small' }
  const tableBtnList: any = {
    detail: { type: 'detail', name: intl.get('BASE_DETAIL') },
    info: { type: 'info', name: intl.get('BASE_DETAIL') },
    edit: { type: 'edit', name: intl.get('BASE_EDIT') },

    able: {
      type: 'able',
      key: 'state',
      ableValue: 1,
      ableName: intl.get('BASE_ENABLE'),
      disAbleName: intl.get('BASE_DISABLE')
    },
    del: { type: 'del', name: intl.get('BASE_DEL') },
    down: { type: 'down', name: intl.get('BASE_DOWN') }
  }
  const pageProps = {
    showPage,
    current,
    pageSize,
    total
  }
  const selectionProps = {
    name: '撤销',
    isShow: selection || false,
    onHandle: onHandleAll
  }
  return (
    <MidTable
      language={language}
      className={styles.table}
      tableBtnList={tableBtnList}
      permissionList={permissionList}
      btnProps={btnProps}
      pageProps={pageProps}
      selectionProps={selectionProps}
      {...restProps}
    />
  )
})
