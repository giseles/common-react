import React, { useEffect } from 'react';
import { Outlet, history, useLocation } from 'umi';
import { App } from 'antd';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import Base from './Base';
import './index.less';

export default () => {
  // let location = useLocation();
  // useEffect(() => {}, [location]);

  const unListen = history.listen(({ location, action }) => {
    console.log('sdfsdfds');
    console.log(location.pathname);
  });
  unListen();

  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <App>{location.pathname === '/login' ? <Outlet /> : <Base />}</App>
    </StyleProvider>
  );
};
