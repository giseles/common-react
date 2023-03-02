import React, { useState } from 'react';
import { useModel } from 'umi';
import { useDeepCompareEffect } from 'common-hook';
import { LiteTable } from '@/common';
import { apiList, apiDel, apiAdd, apiEdit } from './service';

export default () => {
  const { permissionList, baseEnums } = useModel('global');
  const [base, setBase] = useState({});
  useDeepCompareEffect(() => {
    const search = [
      {
        type: 'text',
        name: 'search',
        itemProps: {
          placeholder: '组别',
        },
      },
    ];
    const columns = [
      {
        title: 'ID',
        dataIndex: 'enterprise',
        key: 'enterprise',
      },
      {
        title: '组别',
        dataIndex: 'loginName',
        key: 'loginName',
      },
      {
        title: '总目标业绩',
        dataIndex: 'loginName',
        key: 'loginName',
      },
      {
        title: '负责人',
        dataIndex: 'roles',
        key: 'roles',
      },
      {
        title: '组内人数',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email2',
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
        name: 'appId',
        label: '组别',
      },
      {
        name: 'name',
        label: '总目标业绩',
        rules: [{ min: 1, max: 8 }],
      },
      {
        name: 'loginName',
        label: '负责人',
      },
      {
        type: 'sort',
        name: 'sort',
        label: '组内人数',
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
      title="系统内容维护"
      {...base}
      // add="添加"
      apiList={{
        list: apiList,
        add: apiAdd,
        edit: apiEdit,
        del: apiDel,
      }}
    />
  );
};
