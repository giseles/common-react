import React, { useState } from 'react';
import { useModel } from 'umi';
import { useDeepCompareEffect } from 'common-hook';
import { getObjKey } from 'common-screw';
import { LiteTable } from '@/common';
import { apiList, apiExp } from './service';

export default () => {
  const { permissionList, baseEnums } = useModel('global');
  const [base, setBase] = useState({});

  useDeepCompareEffect(() => {
    const search = [
      {
        type: 'text',
        name: 'search',
        itemProps: {
          placeholder: '成员名称',
        },
      },
      {
        type: 'select',
        itemProps: {
          placeholder: '项目状态',
        },
        optionList: baseEnums.productList,
      },
    ];
    const columns = [
      {
        title: '成员名称',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '所属组别',
        dataIndex: 'language',
        key: 'language',
        render: (text: any) => getObjKey(baseEnums.languageList, text),
      },
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
      },

      {
        title: '项目类型',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '项目状态',
        dataIndex: 'createTime',
        key: 'createTime2',
      },
      {
        title: '总工时（天）',
        dataIndex: 'createTime',
        key: 'createTime3',
      },
      {
        title: '202301',
        dataIndex: 'createTime',
        key: 'createTime4',
      },
      {
        title: '202302',
        dataIndex: 'createTime',
        key: 'createTime5',
      },
    ];
    setBase({
      search,
      columns,
    });
  }, [permissionList, baseEnums]);
  return (
    <LiteTable
      title="成员工时统计报表"
      {...base}
      apiList={{
        list: apiList,
        exp: apiExp,
      }}
      exportBtn={{
        icon: 'iconleading-out-01',
        name: '导出',
        fileName: '成员工时统计报表',
      }}
    />
  );
};
