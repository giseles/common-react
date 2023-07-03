import React, { useCallback, memo } from 'react'
import { connect } from 'umi'
import { ProForm as MidProForm } from 'common-mid'
import { useUnmount, useDeepCompareEffect } from 'common-hook'
import { isString, isNil } from 'common-screw'
import { Header, Form } from '@/components'
import { toPush } from '@/utils'
import styles from './index.less'

const Model = ({ proForm, global }) => ({ proForm, global })
export const ProForm = connect(Model)(
  memo(({ dispatch, proForm, global, ...props }) => {
    const {
      type = 'add',
      subTitle,
      back = '',
      formList,
      apiList,
      formHandle = {},
      formProps: forProp = {},
      isBorder = true,
      successCallback,
      initParam,
      toDetail = null,
      preSubmit = null,
      toBase = null
    } = props

    const { loading, spinning, initialValues, column } = proForm
    const { baseEnum, urlHistory } = global

    const componentProps = { Header, Form }
    const headerProps = {
      subTitle,
      title: (type === 'add' ? '添加' : '编辑') + subTitle
    }

    const formProps = {
      formList: column,
      initialValues,
      formHandle,
      loading,
      spinning,
      ...forProp
    }

    useDeepCompareEffect(() => {
      // 设置 column
      dispatch({
        type: 'proForm/toUpdate',
        payload: { column: toBase ? toBase(baseEnum) : formList }
      })
    }, [toBase, baseEnum, formList])

    useDeepCompareEffect(() => {
      // 获取详情 同步详情
      if (type === 'edit' && apiList.apiDetail && isNil(initialValues) && initParam) {
        dispatch({
          type: 'proForm/toDetail',
          payload: {
            api: apiList.apiDetail,
            item: initParam,
            toDetail
          }
        })
      } else {
        dispatch({
          type: 'proForm/toUpdate',
          payload: { spinning: false }
        })
      }
    }, [apiList.apiDetail, toDetail, initParam, type])

    // 卸载时 重置状态
    useUnmount(() => dispatch({ type: 'common/toReset', payload: { name: 'proForm' } }))

    const onSubmit = (data, preSubmit, initParam) => {
      const res = preSubmit ? preSubmit(data) : data
      if (preSubmit && isNil(res)) {
        setLoading(false)
        return null
      }
      dispatch({
        type: 'proForm/toSubmit',
        payload: {
          api: type === 'edit' ? apiList.apiEdit : apiList.apiAdd,
          data: {
            ...initParam,
            ...res
          }
        },
        callback: () => {
          if (successCallback) {
            successCallback()
            setLoading(false)
          } else {
            onBack()
          }
        }
      })
    }
    const onBack = useCallback(() => {
      isString(back) ? toPush(urlHistory[1] || back) : back()
    }, [back, urlHistory[1]])

    const setLoading = (loading: boolean) => {
      dispatch({
        type: 'proForm/toUpdate',
        payload: { loading }
      })
    }

    return (
      <MidProForm
        className={isBorder ? styles.wrap : styles.wrapNoBorder}
        componentProps={componentProps}
        headerProps={headerProps}
        formProps={formProps}
        onSubmit={useCallback(
          (data) => onSubmit(data, preSubmit, initParam),
          [preSubmit, initParam]
        )}
        onBack={onBack}
        setLoading={useCallback((data) => setLoading(data), [])}
      />
    )
  })
)
