import { message } from 'antd';

/**
 * @description ### 生成随机字符串
 *
 * @param {number} len 字符串长度
 */
function getRandomStr(len) {
  let str = '';
  for (; str.length < len; str += Math.random().toString(36).substr(2));
  return str.substr(0, len);
}

// 统一返回数据处理
const throwMessage = (data) => {
  // message.config({
  //   maxCount: 1
  // })
  if (data.code === '8001') {
    message.success(`${data.msg}`);
  } else if (data.code === '1111') {
    message.loading(`${data.msg}`);
  } else {
    message.error(`${data.msg}`);
  }
};

export { getRandomStr, throwMessage };
export * from './config';
export * from './encrypt';
export { default as axios } from './request';
