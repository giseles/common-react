import React, { useState, useCallback, useEffect } from 'react';
import { Space, Switch, Table } from 'antd';
import { history } from 'umi';

import type { ColumnsType } from 'antd/es/table';
import { useDeepCompareEffect } from 'common-hook';
import { LooseObject, getObjKey } from 'common-screw';
import { Gantt, Search } from '@/components';
import { LiteTable } from '@/common';
// import { apiList, apiDel, apiAble } from './service'

const { Column } = Table;

export default (props: any) => {
  const [base, setBase] = useState<any>({});
  const baseEnums = {};

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
      {
        type: 'dateRange',
        name: ['searchBgnTime', 'searchEndTime'],
      },
    ];
    const columns1: ColumnsType<object> = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        render: (item: any, _: any) => {
          return (
            <div
              className="textLink"
              onClick={() => history.push('/home/detail', { id: _.key })}
            >
              {item}
            </div>
          );
        },
      },
    ];
    setBase({
      search,
      columns1,
    });
  }, []);

  const data = [
    {
      key: 2,
      name: '一级1',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      startDay: '2023-04-10',
      endDay: '2023-04-20',
    },
    {
      key: 1,
      name: '一级2',
      age: 60,
      address: 'New York No. 1 Lake Park',
      startDay: '2023-04-7',
      endDay: '2023-05-20',
      children: [
        {
          key: 11,
          name: '二级1',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 13,
          name: '二级2',
          age: 72,
          address: 'London No. 1 Lake Park',
        },
        {
          key: 12,
          name: '二级3',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: '三级',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
      ],
    },
  ];

  const onSearch = (values: object) => {
    // console.log('onSearchonSearchonSearch');
    // console.log(values);
    // dispatch({ type: 'liteTable/list', payload: { ...values } })
  };

  return (
    <>
      {/* <Search
        title="项目总览"
        search={base.search}
        onChange={useCallback((value: any) => onSearch(value), [])}
      /> */}
      <Gantt
        columns={base.columns1}
        dataSource={data}
        dateRange={['2023-04-06', '2023-06-07']}
      />
    </>
  );
};
