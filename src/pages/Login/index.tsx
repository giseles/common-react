import React from 'react';
import { useModel } from 'umi';
import { Form, Input, Button } from 'antd';
import { useMount, useUnmount } from 'common-hook';
import { IconFont } from '@/components';
import { Encrypt } from '@/utils';
import styles from './index.less';

export default () => {
  const { toClear, loading, toSubmit } = useModel('Login.model');
  //组件初始化
  useMount(() => console.log('首次进入'));
  // 组件卸载
  useUnmount(() => toClear());

  const onSubmit = (values: any) => {
    toSubmit({ username: values.username, password: Encrypt(values.password) });
  };

  return (
    <div className={styles.wrap}>
      <main>
        <div className={styles.bgImg}></div>
        <div className={styles.leftImg}></div>
        <article className={styles.right}>
          <header className={styles.title}>
            <div className={styles.img}></div>
            <div className={styles.name}>欢迎登录出行服务平台</div>
          </header>

          <Form className={styles.loginForm} onFinish={onSubmit}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder="请输入用户名"
                autoComplete="off"
                prefix={<IconFont type="icondl_zh" style={{ fontSize: 20 }} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                prefix={<IconFont type="icondl_mm" style={{ fontSize: 20 }} />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className={styles.btn}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </article>
      </main>
    </div>
  );
};
