import React, { memo } from 'react'
import { useSelector } from 'dva'
import { MidForm } from 'common-mid'
import { Upload as BaseUpload, Message, RichText } from 'componentTs'
import Encrypt from 'config/crypto'
// import { MidForm } from './a'
import styles from './index.module.less'

export const FormTd = memo((props: any) => {
  const { returnName, onBack, onSubmit, loading, setLoading, ...restProps } = props
  const { intl, language } = useSelector((_: any) => _.global)
  const formRules: any = {
    name: [
      { required: true },
      { min: 6, max: 26 },
      {
        pattern: /^(?!\d*$)[a-zA-Z\d]*$/,
        message: intl.get('RULE_NAME')
      }
    ],
    password: [
      { required: true },
      { min: 6, max: 26 },
      {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,
        message: intl.get('RULE_PASSWORD')
      }
    ],
    newPassword: [
      { min: 6, max: 26 },
      {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,
        message: intl.get('RULE_PASSWORD')
      }
    ],
    confirmPassword: [
      { required: true },
      { min: 6, max: 26 },
      {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/,
        message: intl.get('RULE_PASSWORD')
      },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error(intl.get('RULE_PASSWORD_CONFIRM')))
        }
      })
    ],
    select: [{ required: true }],
    radio: [{ required: true }],
    date: [],
    // time: [{ required: true }],
    dateAndTime: [
      { required: true }
      // {
      //   validator: (rule: any, value: any) => {
      //     if (value && value < moment().endOf('minute')) {
      //       return Promise.reject('时间已过')
      //     }
      //     return Promise.resolve()
      //   }
      // }
    ],
    file: [{ required: true }],
    fileUrl: [{ required: true }],
    imgCrop: [{ required: true }],
    upload: [{ required: true }],
    cascader: [{ required: true }],
    timeRange: [{ required: true }],
    richText: [
      { required: true },
      {
        validator: async (rule: any, value: any) => {
          if (value === '<p></p>' || (value && value.toHTML && value.toHTML() === '<p></p>'))
            throw new Error(intl.get('RULE_RICHTEXT'))
        }
      }
    ],
    image: [],
    media: [],
    remark: [{ max: 100 }],
    phone: [{ required: true }, { pattern: /\d$/, message: intl.get('RULE_PHONE') }],
    telephone: [{ required: true }, { pattern: /^1\d{10}$/, message: intl.get('RULE_PHONE') }],
    email: [
      { required: true },
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: intl.get('RULE_EMAIL')
      }
    ],
    unRequired: [],
    selectNoRequired: [],
    undefined: [{ required: true }],
    sort: [
      { required: true },
      { pattern: /^[1-9]\d*$/, message: intl.get('RULE_NUMBER') },
      {
        validator: async (rule: any, value: any) => {
          if (value && value > 10000) throw new Error(intl.get('RULE_SORT_TIP'))
        }
      }
    ]
  }
  const formProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
    autoComplete: 'off',
    size: 'large',
    className: [styles.form, props.formLayout === 'center' && styles.formLayoutCenter]
  }
  const componentProps = {
    BaseUpload,
    Message,
    Encrypt,
    RichText
  }
  const btnProps = {
    submitName: intl.get('BASE_SUBMIT'),
    returnName: returnName || intl.get('BASE_RETURN'),
    isShowReturn: true,
    loading,
    setLoading,
    onBack,
    onSubmit
  }

  return (
    <MidForm
      language={language}
      formRules={formRules}
      componentProps={componentProps}
      formProps={formProps}
      btnProps={btnProps}
      {...restProps}
    />
  )
})
