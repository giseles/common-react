import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { history } from 'umi';

import { useDeepCompareEffect } from 'common-hook';
import { toString } from 'common-screw';
import { LiteForm } from 'common';
import { Description, PageHeader } from '@/components';
// import { apiAdd } from './service'

export default () => {
  console.log(history.location.state);
  const items = [
    { label: '项目 1', key: 'item-1', children: '内容 1' }, // 务必填写 key
    { label: '项目 2', key: 'item-2', children: '内容 2' },
  ];

  const column1 = [
    {
      label: '团队成员 总人数',
      dataIndex: 'motorNo',
    },
    {
      label: '总任务数',
      dataIndex: 'motorNo',
    },
    {
      label: '已延期',
      dataIndex: 'motorControllerNo',
    },
    {
      label: '未开始',
      dataIndex: 'meterNo',
    },
    {
      label: '进行中',
      dataIndex: 'meterNo',
    },
    {
      label: '已完成',
      dataIndex: 'meterNo',
    },
  ];
  const column2 = [
    {
      label: '合同金额',
      dataIndex: 'motorNo',
    },
    {
      label: '总目标业绩',
      dataIndex: 'motorNo',
    },
    {
      label: '项目总分',
      dataIndex: 'motorControllerNo',
    },
    {
      label: '预计提测时间',
      dataIndex: 'meterNo',
    },
    {
      label: '交付时间',
      dataIndex: 'meterNo',
    },
    {
      label: '备注',
      dataIndex: 'meterNo',
    },
  ];
  return (
    <>
      <PageHeader
        title="项目概况"
        style={{ margin: '-10px 0 0' }}
        back="/home"
        extra={
          <Button size="large" type="primary">
            编辑
          </Button>
        }
      />
      <Description
        descProps={{ colon: false, bordered: false }}
        column={column1}
        dataSource={{}}
      />
      <Description
        descProps={{ colon: false, bordered: false }}
        column={column2}
        dataSource={{}}
      />
      <Tabs items={items} />
    </>
  );
};
