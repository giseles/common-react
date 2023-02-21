import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'dva'
import { MidDescription } from 'common-mid'
import { getZoneDate } from 'utils'
import styles from './index.module.less'

export const Description = memo((props: any) => {
  const { column: initColumn, descProps, type, ...restProps } = props
  const { timeZone } = useSelector((_: any) => _.global)
  const [column, setColumn] = useState(initColumn)

  useEffect(() => {
    const column: any = [...initColumn]
    initColumn.forEach((item: any, index: any) => {
      if (item.type === 'timeZone') {
        column[index] = {
          ...item,
          render: (text: any) => getZoneDate(text, timeZone)
        }
      }
    })
    setColumn(column)
  }, [initColumn, timeZone])

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
