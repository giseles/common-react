import { memo } from 'react'
import { useSelector } from 'dva'
import { message as AntdMessage } from 'antd'
import { useDeepCompareEffect } from 'common-hook'

export default memo(() => {
  const message = useSelector((_) => _.global.message)
  const [messageApi, contextHolder] = AntdMessage.useMessage()

  useDeepCompareEffect(() => {
    message?.content &&
      messageApi.open({
        key: 'onlyOne',
        style: { marginTop: '65' },
        // duration:3,
        ...message
      })
  }, [messageApi, message.time])

  return contextHolder
})
