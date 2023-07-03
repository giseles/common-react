import React, { memo } from 'react'
import { Space } from 'antd'
import { useSelector } from 'dva'
import { Button } from '@/components'
import { toPush } from '@/utils'
import styles from './index.less'

export const Header = memo((props) => {
  const { urlHistory } = useSelector((_: any) => _.global)
  const { back = null, title, extra, style } = props

  return (
    <div className={styles.wrap} style={style}>
      <div className={styles.title}>{title}</div>
      <Space size="middle">
        {extra}
        {back && (
          <Button
            key="back"
            type="back"
            name="返回"
            onClick={() => toPush(urlHistory[1] || back)}
          />
        )}
      </Space>
    </div>
  )
})
