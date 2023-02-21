import { useEffect } from 'react';
import { App } from 'antd';
import { useModel } from '@umijs/max';

export default () => {
  const { message } = App.useApp();
  const { name } = useModel('global');
  const { wawa } = useModel('Login.model');
  useEffect(() => {
    message.success('Good!');
  });

  return (
    <div>
      {name}
      {wawa}lgon
    </div>
  );
};
