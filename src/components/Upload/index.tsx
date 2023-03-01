import React, { memo } from 'react';
import { MidUpload } from 'common-mid';
import { storage } from 'common-screw';
import { Message } from '@/components';
import styles from './index.module.less';

export const Upload = memo((props: any) => {
  const fileServerUrl = '';
  const imageUploadUrl = '';
  const videoUploadUrl = '';
  const fileUploadUrl = '';
  const { type, limits } = props;
  const typeInfo: any = {
    image: {
      typeName: '图片',
      uploadUrl: imageUploadUrl,
      limits: { fileType: 'image', maxSize: '10', ...limits },
    },
    video: {
      typeName: '视频',
      uploadUrl: videoUploadUrl,
      limits: { fileType: 'video', maxSize: '100', ...limits },
    },
    file: {
      typeName: '文件',
      uploadUrl: fileUploadUrl,
      limits: { maxSize: '10', ...limits },
    },
    imageCrop: {
      typeName: '图片',
      uploadUrl: imageUploadUrl,
      limits: { aspect: 1, fileType: 'image', maxSize: '10', ...limits },
    },
  };

  return (
    <MidUpload
      className={styles.upload}
      {...props}
      {...typeInfo[type]}
      message={Message}
      headers={{ authorization: storage.getItem('token') }}
      serverUrl={fileServerUrl}
    />
  );
});
