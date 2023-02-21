import React, { memo } from 'react'
import { useSelector } from 'dva'
import { MidUpload } from 'common-mid'
import { storage } from 'common-screw'
import { Message } from 'componentTs'
import { imageUploadUrl, videoUploadUrl, fileUploadUrl } from 'config/request'
// import { MidUpload } from './Upload'
import styles from './index.module.less'

export const Upload = memo((props: any) => {
  const { intl, language } = useSelector((_: any) => _.global)
  const { fileServerUrl } = useSelector((_: any) => _.common)
  const { type, limits } = props
  const typeInfo: any = {
    image: {
      typeName: intl.get('BASE_IMG'),
      uploadUrl: imageUploadUrl,
      limits: { fileType: 'image', maxSize: '10', ...limits }
    },
    video: {
      typeName: intl.get('BASE_VIDEO'),
      uploadUrl: videoUploadUrl,
      limits: { fileType: 'video', maxSize: '100', ...limits }
    },
    file: {
      typeName: intl.get('BASE_FILE'),
      uploadUrl: fileUploadUrl,
      limits: { maxSize: '10', ...limits }
    },
    imageCrop: {
      typeName: intl.get('BASE_IMG'),
      uploadUrl: imageUploadUrl,
      limits: { aspect: 1, fileType: 'image', maxSize: '10', ...limits }
    }
  }

  return (
    <MidUpload
      className={styles.upload}
      language={language}
      {...props}
      {...typeInfo[type]}
      message={Message}
      headers={{ authorization: storage.getItem('token') }}
      serverUrl={fileServerUrl}
    />
  )
})
