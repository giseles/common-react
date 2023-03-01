import React, { useCallback, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { useModel } from 'umi';
import { ProForm } from 'common-mid';
import { isNil, isString } from 'common-screw';
import { useDeepCompareEffect } from 'common-hook';
import { PageHeader, FormTd } from '@/components';
import styles from './index.module.less';

export default (props: any) => {
  const { loading, initList } = useModel('global');
  const {
    type = 'add',
    subTitle,
    back,
    formList: initFormList,
    initialValues = {},
    apiList,
    preSubmit = null,
    formHandle = {},
    formProps: forProp = {},
    className,
    successCallback,
  } = props;

  const [formList, setFormList] = useState(initFormList);
  const componentProps = { Header: PageHeader, Form: FormTd };
  const headerProps = {
    subTitle,
    back,
    title: type === 'add' ? '添加' : '编辑',
  };
  const formProps = {
    formList,
    initialValues: { ...initialValues, ...initList },
    loading,
    formHandle,
    ...forProp,
  };

  useDeepCompareEffect(() => {
    const formList: any = [];
    initFormList &&
      initFormList.forEach((item: any) => {
        if (!item.hide) {
          formList.push(item);
        }
      });
    setFormList(formList);
  }, [initFormList]);

  useEffect(() => {
    setLoading(false);
    return () => {};
  }, []);

  useDeepCompareEffect(() => {
    // 获取详情
    // type === 'edit' && apiList.detail;
  }, [apiList, type, initialValues]);

  const onSubmit = (data: any) => {
    console.log(data);
    data = preSubmit ? preSubmit(data) : data;
    if (preSubmit && isNil(data)) {
      setLoading(false);
      return null;
    }
  };
  const onBack = useCallback(() => {}, [back]);

  const setLoading = (data: any) => {};

  return (
    <ProForm
      className={className || styles.wrap}
      children={props.children}
      componentProps={componentProps}
      headerProps={headerProps}
      formProps={formProps}
      onSubmit={useCallback((data: any) => onSubmit(data), [])}
      onBack={onBack}
      setLoading={useCallback((data: any) => setLoading(data), [])}
    />
  );
};
