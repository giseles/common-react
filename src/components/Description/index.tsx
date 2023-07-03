import React, { memo } from 'react'
import { MidDescription } from 'common-mid'
import styles from './index.less'

export const Description = memo((props) => {
  const { column, descProps, ...restProps } = props
  const property = {
    colon: false,
    bordered: false,
    labelStyle: { alignItems: 'center', marginRight: 5 }, // 标签样式
    contentStyle: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, // 内容样式
    ...descProps
  }
  return (
    <MidDescription column={column} className={styles.wrap} property={property} {...restProps} />
  )
})
