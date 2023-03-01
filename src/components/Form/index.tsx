import React, { memo } from 'react';
import { MidForm } from 'common-mid';
import { Upload as BaseUpload, Message, RichText } from '@/components';
import { Encrypt } from '@/utils';
import styles from './index.module.less';

export const Form = memo((props: any) => {
  const { returnName, onBack, onSubmit, loading, setLoading, ...restProps } =
    props;
  const formRules: any = {
    name: [
      { required: true },
      { min: 6, max: 26 },
      {
        pattern: /^(?!\d*$)[a-zA-Z\d]*$/,
        message: '请输入字母数字组合或纯字母',
      },
    ],
    select: [{ required: true }],
    radio: [{ required: true }],
    date: [],
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
          if (
            value === '<p></p>' ||
            (value && value.toHTML && value.toHTML() === '<p></p>')
          )
            throw new Error('请输入内容');
        },
      },
    ],
    image: [],
    media: [],
    remark: [{ max: 100 }],
    phone: [
      { required: true },
      { pattern: /\d$/, message: '请输入正确的电话' },
    ],
    telephone: [
      { required: true },
      { pattern: /^1\d{10}$/, message: '请输入正确的电话' },
    ],
    email: [
      { required: true },
      {
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '请输入正确的邮箱',
      },
    ],
    unRequired: [],
    selectNoRequired: [],
    undefined: [{ required: true }],
  };
  const formProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
    autoComplete: 'off',
    size: 'large',
    className: [
      styles.form,
      props.formLayout === 'center' && styles.formLayoutCenter,
    ],
  };
  const componentProps = {
    BaseUpload,
    Message,
    Encrypt,
    RichText,
  };
  const btnProps = {
    submitName: intl.get('BASE_SUBMIT'),
    returnName: returnName || intl.get('BASE_RETURN'),
    isShowReturn: true,
    loading,
    setLoading,
    onBack,
    onSubmit,
  };

  return (
    <MidForm
      formRules={formRules}
      componentProps={componentProps}
      formProps={formProps}
      btnProps={btnProps}
      {...restProps}
    />
  );
});
