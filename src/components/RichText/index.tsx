import React, { memo } from 'react'
import { useSelector } from 'dva'
import { MidRichText } from 'common-mid'
import { videoUploadUrl } from 'config/request'
import { Message } from 'componentTs'
import axios from 'utils/request'
import './index.less'

export const RichText = memo((props: any) => {
  const { fileServerUrl } = useSelector((_: any) => _.common)

  return (
    <MidRichText
      {...props}
      axios={axios}
      message={Message}
      serverUrl={fileServerUrl}
      uploadUrl={videoUploadUrl}
    />
  )
})
