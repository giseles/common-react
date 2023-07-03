import React, { memo, useState, useEffect } from 'react'
import { MidEmpty } from 'common-mid'
import styles from './index.less'

export const Empty = memo(() => {
  const [resultProps, setResultProps] = useState({})
  const [tip, setTip] = useState({})
  useEffect(() => {
    setResultProps({
      status: '404',
      title: '404',
      subTitle: '出错啦！您访问的页面没找到！'
    })

    setTip({
      back: '返回上一级'
    })
  }, [])

  return <MidEmpty className={styles.layout} resultProps={resultProps} tip={tip} />
})
