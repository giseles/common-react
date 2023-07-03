import React, { memo } from 'react'
import { MidForm } from 'common-mid'
import { Upload as BaseUpload, Message, RichText } from '@/components'
import { Encrypt } from '@/config'
import styles from './index.less'

export const Form = memo((props: any) => {
  const { returnName, onBack, onSubmit, loading, setLoading, spinning, ...restProps } = props
  // 密码正则
  const passwordRule = [
    { min: 6, max: 26 },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,
      message: '密码为6-26位字母数字组合'
    }
  ]

  const formRules: any = {
    unRequired: [],
    required: [{ required: true }],
    selectNoRequired: [],
    remark: [{ min: 0, max: 255 }],
    select: [{ required: true }],
    radio: [{ required: true }],
    upload: [{ required: true }],
    cascader: [{ required: true }],
    undefined: [{ required: true }, { min: 1, max: 32 }],
    // 联系电话
    telephone: [{ required: true }, { pattern: /^1\d{10}$/, message: '请输入正确的联系电话' }],
    // 邮箱
    email: [
      { required: true },
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '请输入正确的邮箱'
      }
    ],
    // 富文本
    richText: [
      { required: true },
      {
        validator: async (rule, value) => {
          if (value === '<p></p>' || (value && value.toHTML && value.toHTML() === '<p></p>'))
            throw new Error('请输入内容')
        }
      }
    ],
    // 登录账号
    account: [
      { required: true },
      { min: 6, max: 26 },
      {
        pattern: /^(?!\d*$)[a-zA-Z\d]*$/,
        message: '登录账号为6-26位字母数字组合或纯字母'
      }
    ],
    // 密码
    password: [{ required: true }, ...passwordRule],
    // 新密码
    newPassword: [...passwordRule],
    // 确认密码
    confirmPassword: [
      { required: true },
      ...passwordRule,
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('两次密码不一致，请重新输入'))
        }
      })
    ],
    // 编号 - 站点编号 天线编号
    number: [
      { required: true },
      { min: 2, max: 8 },
      {
        pattern: /^(?!\d*$)[a-zA-Z\d]*$/,
        message: '编号为2-8位字母数字组合或纯字母'
      }
    ]
  }
  const formProps = {
    labelCol: { span: 24 },
    wrapperCol: { span: 12 },
    autoComplete: 'off',
    size: 'mid',
    className: styles.wrap,
    spinning
  }
  const componentProps = {
    BaseUpload,
    Message,
    Encrypt,
    RichText
  }
  const btnProps = {
    submitName: '提交',
    returnName: returnName || '返回',
    isShowReturn: true,
    loading,
    setLoading,
    onBack,
    onSubmit
  }

  return (
    <MidForm
      formRules={formRules}
      componentProps={componentProps}
      formProps={formProps}
      btnProps={btnProps}
      {...restProps}
    />
  )
})
