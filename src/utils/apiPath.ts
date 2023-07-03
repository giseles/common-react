const API_BASE = '/API_BASE'
const v1 = API_BASE + '/api/v1'

export const api = {
  login: v1 + '/auth/web/login',
  permission: v1 + '/web/permission',
  enums: v1 + '/backend/enum/list',
  apiUpload: v1 + '/backend/file/upload', // 文件上传
  apiImgOss: '', //图片 OSS base地址 
}
