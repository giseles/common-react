import React, { useCallback } from 'react';
import { useModel, history } from 'umi';
import { ProForm as MidProForm } from 'common-mid';
import { useUnmount } from 'common-hook';
import { PageHeader, Form } from '@/components';
import styles from './index.module.less';
import { isString } from 'common-screw';

export const ProForm = (props: any) => {
  const { loading, toUpdate, toSubmit, toClear } = useModel('proForm');
  const {
    type = 'add',
    subTitle,
    back,
    formList,
    initialValues = {},
    apiList,
    formHandle = {},
    formProps: forProp = {},
    className,
    successCallback,
  } = props;

  const componentProps = { Header: PageHeader, Form: Form };
  const headerProps = {
    subTitle,
    back,
    title: type === 'add' ? '添加' : '编辑',
  };
  const formProps = {
    formList,
    initialValues,
    loading,
    formHandle,
    ...forProp,
  };

  // 卸载时 重置状态
  useUnmount(() => toClear());

  const onSubmit = (data: any) => {
    toSubmit(
      {
        ...data,
        apiList: apiList[type],
        id: type === 'edit' && initialValues.id ? initialValues.id : undefined,
      },
      () => {
        if (successCallback) {
          successCallback();
          setLoading(false);
        } else {
          onBack();
        }
      },
    );
  };
  const onBack = useCallback(() => {
    isString(back) ? history.push(back) : back();
  }, [back]);

  const setLoading = (loading: boolean) => toUpdate({ loading });
  return (
    <MidProForm
      className={className || styles.wrap}
      componentProps={componentProps}
      headerProps={headerProps}
      formProps={formProps}
      onSubmit={useCallback((data: any) => onSubmit(data), [])}
      onBack={onBack}
      setLoading={useCallback((data: any) => setLoading(data), [])}
    />
  );
};
