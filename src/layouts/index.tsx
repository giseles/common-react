import React, { useEffect } from 'react';
import { Outlet, useLocation, useModel } from 'umi';
import { App } from 'antd';

import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import Base from './Base';

export default () => {
  // const { toClear } = useModel('global');
  let location = useLocation();
  useEffect(() => {}, [location]);

  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <App>{location.pathname === '/login' ? <Outlet /> : <Base />}</App>
    </StyleProvider>
  );
};
