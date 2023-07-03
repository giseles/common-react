import React from 'react'
import { Outlet, useLocation, setLocale } from 'umi'
import { ConfigProvider, App } from 'antd'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { useMount } from 'common-hook'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import { theme } from '@/config'
import Base from './Base'
import Message from './Message'
import '@/config/base.less'

dayjs.locale('zh-cn')

export default () => {
  const pathname = useLocation().pathname

  useMount(() => setLocale('zh-CN', false))

  return (
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
        <App>
          {pathname === '/login' ? <Outlet /> : <Base pathname={pathname} />}
          <Message />
        </App>
      </StyleProvider>
    </ConfigProvider>
  )
}
