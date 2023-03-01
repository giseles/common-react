import React, { memo, useState, useEffect } from 'react'
import { MidDescription } from 'common-mid'
import { timestampToDate } from 'common-screw'
import styles from './index.module.less'

export const Description = memo((props: any) => {
  const { column, descProps, type, ...restProps } = props



  return (
    <MidDescription
      {...restProps}
      column={column}
      className={
        descProps?.bordered === false
          ? styles.wrap
          : [styles.borderWrap, type === 'detail' && styles.detail]
      }
      descProps={{ bordered: true, ...descProps }}
    />
  )
})
