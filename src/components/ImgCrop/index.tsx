import React, { memo } from 'react'
import { Upload } from 'componentTs'

// const limits = {
//   width: 700,
//   maxSize: 10,
//   fileType: 'png',
//   aspect: 1
// }

export const ImgCrop = memo((props: any) => {
  return <Upload {...props} type="imageCrop" />
})
