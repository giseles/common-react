import React, { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { getObjKey } from 'common-screw';
import { LiteTable } from '@/common';
import { apiList, apiExp } from './service';

export default () => {
  const { baseEnums } = useModel('global');
  const [base, setBase] = useState({});

  useEffect(() => {
    const search = [
      {
        type: 'text',
        name: 'search',
        itemProps: {
          placeholder: '项目名称',
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
        title: '项目名称',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '项目类型',
        dataIndex: 'language',
        key: 'language',
        render: (text: any) => getObjKey(baseEnums.languageList, text),
      },
      {
        title: '项目成员',
        dataIndex: 'name',
        key: 'name',
      },

      {
        title: '所属组别',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '项目状态',
        dataIndex: 'createTime',
        key: 'createTime1',
      },
      {
        title: '总工时（天）',
        dataIndex: 'createTime',
        key: 'createTime2',
      },
      {
        title: '202301',
        dataIndex: 'createTime',
        key: 'createTime3',
      },
      {
        title: '202302',
        dataIndex: 'createTime',
        key: 'createTime4',
      },
    ];
    setBase({
      search,
      columns,
    });
  }, []);
  return (
    <LiteTable
      title="项目工时统计报表"
      {...base}
      apiList={{
        list: apiList,
        exp: apiExp,
      }}
      exportBtn={{
        icon: 'iconleading-out-01',
        name: '导出',
        fileName: '项目工时统计报表',
      }}
    />
  );
};
