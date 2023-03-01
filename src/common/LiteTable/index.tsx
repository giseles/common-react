/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, memo, useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Modal, Button } from 'antd';
import { useDeepCompareEffect } from 'common-hook';
import { isNil, LooseObject } from 'common-screw';
import { ProTable } from 'common-mid';
import { Table, Search, IconFont } from '@/components';
import { LiteModal } from '@/common';

export default (props: any) => {
  const {
    dataSource,
    searchParams,
    enumsList,
    total,
    loading,
    permissionList,
  } = useModel('global');
  const {
    title,
    search = null,
    add,
    columns = [],
    apiList,
    formUrl,
    tableProps: tabProp = {},
    initSearch = {},
    getEnums = {},
    refresh = 0, // 重刷
    formList = {},
    exportBtn = null,
  } = props;
  const [formModal, setFormModal] = useState<LooseObject>({ open: false });
  const [expBtn, setExpBtn] = useState<any>(null);

  const componentProps = { Table, Search };
  const searchProps = { title, search, add, children: expBtn };
  const tableProps = {
    columns,
    loading,
    dataSource,
    current: searchParams.page,
    pageSize: searchParams.pageSize,
    total,
    ...tabProp,
  };
  useDeepCompareEffect(() => {
    // dispatch({
    //   type: 'liteTable/init',
    //   payload: {
    //     apiList,
    //     getEnums,
    //     searchParams: { page: 1, pageSize: 10, ...initSearch },
    //   },
    // });
  }, [apiList, initSearch, getEnums]);
  useEffect(() => {
    //  导出 按钮等
    exportBtn &&
      permissionList.exp &&
      setExpBtn(
        <Button
          key="exp"
          icon={<IconFont type={exportBtn.icon} />}
          onClick={() => onExp({ fileName: exportBtn.fileName })}
        >
          {exportBtn.name}
        </Button>,
      );
  }, [exportBtn, permissionList.exp]);
  useEffect(() => {
    // 重刷
    // refresh && dispatch({ type: 'liteTable/list' });
  }, [refresh]);

  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: 'common/resetState',
  //       payload: { namespace: 'liteTable' },
  //     });
  //   };
  // }, [dispatch]);

  useDeepCompareEffect(() => {
    // 枚举变化
    if (!isNil(enumsList) && !isNil(getEnums.change)) {
      getEnums.change(enumsList);
    }
  }, [enumsList]);

  const onSearch = (values: object) => {
    // dispatch({ type: 'liteTable/list', payload: { ...values } });
  };

  const onHandle = (type: any, item: any = {}) => {
    switch (type) {
      case 'del': // 删除
        Modal.confirm({
          title: '确定要删除吗?',
          onOk: () => {
            // dispatch({
            //   type: 'liteTable/delete',
            //   payload: { id: item.id },
            // });
          },
        });
        break;
      case 'able': // 启用禁用
        Modal.confirm({
          title: item.state === 0 ? '确定要禁用吗?' : '确定要启用吗?',
          onOk: () => {
            // dispatch({
            //   type: 'liteTable/able',
            //   payload: { id: item.id, operation: item.state === 0 ? 1 : 0 },
            // });
          },
        });
        break;
      case 'add': // 添加
        setFormModal({ open: true, title: '添加', type, initialValues: {} });
        break;
      case 'edit': // 编辑
        setFormModal({ open: true, title: '编辑', type, initialValues: item });
        break;
      default:
      // 跳转
      // dispatch({
      //   type: 'common/handleJump',
      //   payload: { pathname: formUrl, type, item },
      // });
    }
  };

  const onExp = (payload: any) => {
    // dispatch({ type: 'liteTable/export', payload });
  };

  return (
    <>
      <ProTable
        componentProps={componentProps}
        searchProps={searchProps}
        tableProps={tableProps}
        searchChange={useCallback(
          (value: any) =>
            onSearch({ ...value, page: 1, pageSize: searchParams.pageSize }),
          [],
        )}
        searchHandle={useCallback(onHandle, [])}
        tableChange={useCallback(
          ({ current, pageSize }: any) => onSearch({ page: current, pageSize }),
          [],
        )}
        tableHandle={useCallback(
          (type: any, item: any) => onHandle(type, item),
          [],
        )}
      />
      <LiteModal
        formList={formList}
        apiList={apiList}
        {...formModal}
        hieModal={useCallback(() => setFormModal({ open: false }), [])}
      />
    </>
  );
};
