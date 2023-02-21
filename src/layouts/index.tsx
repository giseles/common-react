import { Outlet } from 'umi';
import { App } from 'antd';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import Base from './Base';

export default () => {
  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <App>{location.pathname === '/login' ? <Outlet /> : <Base />}</App>
    </StyleProvider>
  );
};
