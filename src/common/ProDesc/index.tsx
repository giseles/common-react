import React, { memo } from 'react'
import { connect } from 'umi'
import { useDeepCompareEffect, useUnmount } from 'common-hook'
import { Description } from '@/components'

const Model = ({ proDesc, global }) => ({ proDesc, global })

export const ProDesc = connect(Model)(
  memo(({ dispatch, global, proDesc, ...props }) => {
    const { baseEnum } = global
    const { spinning, column, dataSource } = proDesc
    const { toBase, initParam, apiList, ...restProps } = props

    const descProps = {
      column,
      dataSource,
      spinning,
      ...restProps
    }

    // 组件卸载
    useUnmount(() => dispatch({ type: 'common/toReset', payload: { name: 'proDesc' } }))

    useDeepCompareEffect(() => {
      // 设置 column
      dispatch({
        type: 'proDesc/toUpdate',
        payload: { column: toBase(baseEnum) }
      })
    }, [toBase, baseEnum])

    useDeepCompareEffect(() => {
      // 获取详情
      apiList.apiDetail &&
        dispatch({
          type: 'proDesc/toDetail',
          payload: {
            api: apiList.apiDetail,
            item: initParam
          }
        })
    }, [apiList.apiDetail, initParam])

    return <Description {...descProps} />
  })
)
