import React, { memo } from 'react'
import { Button as AntBtn } from 'antd'
import { ExportOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons'

export const Button = memo((props) => {
  const { type, name, onClick } = props
  return (
    <AntBtn
      type={type === 'back' ? 'default' : 'primary'}
      onClick={onClick}
      style={{ minWidth: '100px' }}
    >
      {type === 'add' && <PlusOutlined />}
      {type === 'exp' && <ExportOutlined />}
      {type === 'back' && <RollbackOutlined />}
      {name}
    </AntBtn>
  )
})
