import React from 'react';
import { Outlet, useLocation } from 'umi';
import { App } from 'antd';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import Base from './Base';
import './index.less';

export default () => {
  const pathname = useLocation().pathname;
  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <App>{pathname === '/login' ? <Outlet /> : <Base />}</App>
    </StyleProvider>
  );
};
