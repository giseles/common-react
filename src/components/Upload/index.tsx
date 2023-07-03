import React, { memo } from 'react'
import { MidUpload } from 'common-mid'
import { storage } from 'common-screw'
import { Message } from '@/components'
import { api } from '@/utils'
import styles from './index.less'

export const Upload = memo((props: any) => {
  const { type, limits } = props
  const { apiUpload, apiImgOss } = api
  const typeInfo: any = {
    image: {
      typeName: '图片',
      uploadUrl: apiUpload,
      limits: { fileType: 'image', maxSize: '10', ...limits }
    },
    video: {
      typeName: '视频',
      uploadUrl: apiUpload,
      limits: { fileType: 'video', maxSize: '100', ...limits }
    },
    file: {
      typeName: '文件',
      uploadUrl: apiUpload,
      limits: { maxSize: '10', ...limits }
    },
    imageCrop: {
      typeName: '图片',
      uploadUrl: apiUpload,
      limits: { aspect: 1, fileType: 'image', maxSize: '10', ...limits }
    }
  }

  return (
    <MidUpload
      className={styles.upload}
      {...props}
      {...typeInfo[type]}
      message={Message}
      headers={{ authorization: storage.getItem('token') }}
      serverUrl={apiImgOss}
    />
  )
})
