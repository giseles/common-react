import React, { memo } from 'react'
import { useSelector } from 'dva'
import { Button, Header } from '@/components'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { MidSearch } from 'common-mid'
import styles from './index.less'

export const Search = memo((props: any) => {
  const { permissionList } = useSelector((_: any) => _.global)
  const { title, children, searchBtm, ...restProps } = props
  const addProps = {
    isShow: permissionList.add,
    onClick: props.addHandle ? props.addHandle : () => props.addClick('add'),
    icon: <PlusOutlined />,
    name: props.addBtn || props.add || '添加'
  }
  const searchIcon = <SearchOutlined className="site-form-item-icon" style={{ color: '#3082F9' }} />

  const addBtn = addProps.isShow && (
    <Button key="add" type="add" onClick={addProps.onClick} name={addProps.name} />
  )
  return (
    <div className={styles.section}>
      {title && (
        <Header
          title={title}
          extra={[children, addBtn]}
          style={{ paddingBottom: 10, borderBottom: ' 1px solid #E2E5ED' }}
        />
      )}
      <MidSearch addProps={{ isShow: false }} searchIcon={searchIcon} {...restProps} />
      {searchBtm}
    </div>
  )
})
