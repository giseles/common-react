export const getDateDiffList = (start, end) => {
  const info = {};
  start = new Date(start);
  end = new Date(end);
  let current = start;

  while (current <= end) {
    const date = current.getFullYear() + '年' + (current.getMonth() + 1) + '月';
    const day = current.getDate();
    if (info[date]) {
      info[date].push(day);
    } else {
      info[date] = [day];
    }
    current.setDate(current.getDate() + 1);
  }
  return info;
};

export * from './config';
export * from './encrypt';
export { default as axios } from './request';
