import React, { memo, useCallback } from 'react'
import { useDispatch } from 'dva'
import { isString } from 'common-screw'
import { MidPageHeader } from 'common-mid'
import styles from './index.module.less'

export const PageHeader = memo((props: any) => {
  const dispatch = useDispatch()
  const { border, backInfo = null, onBack = null, ...restProps } = props

  const commonBack = useCallback(() => {
    dispatch({
      type: 'common/handleJump',
      payload: isString(backInfo) ? { pathname: backInfo } : backInfo
    })
  }, [backInfo, dispatch])

  return (
    <MidPageHeader
      {...restProps}
      className={border ? styles.header : styles.headerNoBorder}
      onBack={(backInfo && commonBack) || onBack}
    />
  )
})
