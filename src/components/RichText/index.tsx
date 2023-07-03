import React, { memo } from 'react'
import { MidRichText } from 'common-mid'
import { Message } from '@/components'
import { axios } from '@/utils'
import './index.less'

export const RichText = memo((props: any) => {
  const fileServerUrl = ''
  const videoUploadUrl = ''

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
