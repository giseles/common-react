import React, { memo, useState } from 'react'
import { router, useSelector } from 'dva'
import { useDeepCompareEffect } from 'common-hook'
import { MidEmpty } from 'common-mid'
// import { MidEmpty } from './dfg'
import styles from './index.module.less'

const { Link } = router
export const Empty = memo(() => {
  const { language, ablePathList } = useSelector((_: any) => _.global)
  const [resultProps, setResultProps] = useState({})
  const [tip, setTip] = useState({})

  useDeepCompareEffect(() => {
    setResultProps({
      status: '404',
      title: '404',
      subTitle: language === 'zh-CN' ? '出错啦！您访问的页面没找到！' : 'No data'
    })

    if (ablePathList.includes('/home')) {
      setTip({
        back: language === 'zh-CN' ? '返回上一级' : 'Go Back',
        home: language === 'zh-CN' ? '回到首页' : 'Go Home',
        homeUrl: '/home'
      })
    } else {
      setTip({
        back: language === 'zh-CN' ? '返回上一级' : 'Go Back'
      })
    }
  }, [language, ablePathList])

  return <MidEmpty className={styles.layout} Link={Link} resultProps={resultProps} tip={tip} />
})
