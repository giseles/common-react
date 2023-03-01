import { MidMessage } from 'common-mid';
import { message } from 'antd';

// const config = { top: 65, duration: 3, maxCount: 1 };
// const successCode = 8001;
// export const Message = (data: any) => MidMessage(data, config, successCode);
message.config({
  top: 65,
  duration: 3,
  maxCount: 1,
});
export const Message = (data) => {
  const msg = data.msg || data;
  if (data.code === '8001') {
    message.success(msg);
  } else if (data.code === 'loading') {
    message.loading(msg);
  } else {
    message.error(msg);
  }
};
