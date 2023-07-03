import React, { memo } from 'react'
import { useSelector } from 'dva'
import { MidTable } from 'common-mid'
import styles from './index.less'

export const Table = memo((props: any) => {
  const { permissionList } = useSelector((_: any) => _.global)

  const {
    current,
    pageSize,
    total,
    selection,
    onHandleAll,
    showPage = true,
    className,
    pageProps: initPageProps,
    ...restProps
  } = props

  const btnProps = { type: 'link', size: 'small' }
  const tableBtnList: any = {
    detail: { type: 'detail', name: '详情' },
    edit: { type: 'edit', name: '编辑' },

    able: {
      type: 'able',
      key: 'status',
      ableValue: 0,
      ableName: '启用',
      disAbleName: '禁用'
    },
    del: { type: 'del', name: '删除' }
  }
  const pageProps = {
    showPage,
    current,
    pageSize,
    total,
    ...initPageProps
  }
  const selectionProps = {
    name: '撤销',
    isShow: selection || false,
    onHandle: onHandleAll
  }

  return (
    <MidTable
      className={[styles.table, className].join(' ')}
      tableBtnList={tableBtnList}
      permissionList={permissionList}
      btnProps={btnProps}
      pageProps={pageProps}
      selectionProps={selectionProps}
      bordered={false}
      {...restProps}
    />
  )
})
