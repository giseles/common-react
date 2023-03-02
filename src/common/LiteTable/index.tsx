/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, memo, useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Modal, Button } from 'antd';
import { useDeepCompareEffect, useUnmount } from 'common-hook';
import { LooseObject } from 'common-screw';
import { Table, Search, IconFont } from '@/components';
import { LiteModal } from '@/common';

export default memo((props: any) => {
  const { permissionList } = useModel('global');
  const {
    dataSource,
    searchParams,
    total,
    loading,
    toInit,
    toList,
    toDelete,
    toAble,
    toClear,
  } = useModel('proTable');

  const {
    title,
    search = null,
    add,
    columns = [],
    apiList,
    tableProps: tabProp = {},
    initSearch = {},
    refresh = 0, // 重刷
    formList = {},
    exportBtn = null,
  } = props;
  const [formModal, setFormModal] = useState<LooseObject>({ open: false });
  const [expBtn, setExpBtn] = useState<any>(null);

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
    toInit({
      apiList,
      searchParams: { page: 1, pageSize: 10, ...initSearch },
    });
  }, [apiList, initSearch]);
  useEffect(() => {
    console.log(permissionList);
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
    refresh && toList();
  }, [refresh]);

  // 卸载时 重置状态
  useUnmount(() => toClear());

  const onSearch = (values: object) => {
    toList(values);
  };

  const onHandle = (type: any, item: any = {}) => {
    switch (type) {
      case 'del': // 删除
        Modal.confirm({
          title: '确定要删除吗?',
          onOk: () => toDelete({ id: item.id }),
        });
        break;
      case 'able': // 启用禁用
        Modal.confirm({
          title: item.state === 0 ? '确定要禁用吗?' : '确定要启用吗?',
          onOk: () =>
            toAble({ id: item.id, operation: item.state === 0 ? 1 : 0 }),
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
    }
  };

  const onExp = (payload: any) => {
    // dispatch({ type: 'liteTable/export', payload });
  };

  return (
    <>
      <div>
        {searchProps.search && (
          <Search
            {...searchProps}
            onChange={(value: any) =>
              onSearch({ ...value, page: 1, pageSize: searchParams.pageSize })
            }
            addClick={onHandle}
          />
        )}
        <Table
          {...tableProps}
          onChange={({ current, pageSize }: any) =>
            onSearch({ page: current, pageSize })
          }
          onHandle={(type: any, item: any) => onHandle(type, item)}
        />
      </div>
      <LiteModal
        formList={formList}
        apiList={apiList}
        {...formModal}
        hieModal={useCallback(() => setFormModal({ open: false }), [])}
      />
    </>
  );
});
