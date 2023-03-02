import React, { useState } from 'react';
import { useModel } from 'umi';
import { useDeepCompareEffect } from 'common-hook';
import { LiteTable } from '@/common';
import { apiList, apiDel, apiAdd, apiEdit } from './service';

export default () => {
  const { permissionList, baseEnums } = useModel('global');
  const [base, setBase] = useState({});
  const STATE_LIST: any = { 0: '启用', 1: '禁用' };
  useDeepCompareEffect(() => {
    const search = [
      {
        type: 'text',
        name: 'search',
        itemProps: {
          placeholder: '工号、姓名',
        },
      },
      {
        type: 'select',
        name: 'state',
        itemProps: {
          placeholder: '角色',
        },
        optionList: STATE_LIST,
      },
    ];
    const columns = [
      {
        title: '账号ID',
        dataIndex: 'enterprise',
        key: 'enterprise',
      },
      {
        title: '工号',
        dataIndex: 'loginName',
        key: 'loginName',
      },
      {
        title: '姓名',
        dataIndex: 'loginName',
        key: 'loginName',
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '备注',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: '操作',
        key: 'operate',
      },
    ];
    const formList: any = [
      {
        name: 'name',
        label: '姓名',
      },
      {
        name: 'loginName',
        label: '角色',
      },
      {
        type: 'sort',
        name: 'sort',
        label: '备注',
      },
    ];
    setBase({
      search,
      columns,
      formList,
    });
  }, [permissionList, baseEnums]);
  return (
    <LiteTable
      title="员工账号管理"
      {...base}
      add="添加"
      apiList={{
        list: apiList,
        add: apiAdd,
        edit: apiEdit,
        del: apiDel,
      }}
    />
  );
};
