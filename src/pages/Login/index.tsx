import React from 'react'
import { connect } from 'umi'
import { Form, Input, Button } from 'antd'
import { useUnmount } from 'common-hook'
import { Encrypt } from '@/utils'
import styles from './index.less'

const Model = (dva) => {
  return { ...dva.login }
}
export default connect(Model)(({ dispatch, loading }) => {
  // 组件卸载
  useUnmount(() => dispatch({ type: 'common/toReset', payload: { name: 'login' } }))

  const onSubmit = (data: any) => {
    dispatch({ type: 'login/toSubmit', payload: { ...data, password: Encrypt(data.password) } })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.logo} />
      <div className={styles.name}>
        <div className={styles.top}>欢迎使用</div>
        <div className={styles.bottom}>室分天线网络监测平台</div>
      </div>

      <article className={styles.right}>
        <header className={styles.title}>账号登录</header>
        <div className={styles.bar} />
        <Form className={styles.loginForm} onFinish={onSubmit}>
          <div className={styles.formName}>
            <div className={[styles.icon, styles.iconUser].join(' ')} />
            用户名
          </div>
          <Form.Item name="loginName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" autoComplete="off" />
          </Form.Item>
          <div className={styles.formName}>
            <div className={[styles.icon, styles.iconPassword].join(' ')} />
            密码
          </div>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className={styles.btn}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </article>
    </div>
  )
})
