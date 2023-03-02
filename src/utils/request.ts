// request.js
import axios from 'axios';
import { storage as Storage } from 'common-screw';
import { Message } from '@/components';

const requestConfig = {
  timeout: 5000,
  baseURL: '/',
  withCredentials: true,
};
// 登录接口排除token鉴权
const exceptTokenUrls = ['/api/auth'];

// 状态码错误信息
const codeMessage = {
  'zh-CN': {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
    401: '用户没有权限（令牌、用户名、密码错误）',
    403: '用户得到授权，但是访问是被禁止的',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求的格式不可得',
    410: '请求的资源被永久删除，且不会再得到的',
    422: '当创建一个对象时，发生一个验证错误',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
  },
  'en-US': {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'Success',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    406: 'Not Acceptable',
    410: 'Gone',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
  },
};

class Request {
  constructor() {
    this.setDefaultConfig();

    this.pendingList = []; // 正在加载的请求列表
  }

  // 设置全局参数，如响应时间，请求前缀等
  setDefaultConfig() {
    Object.keys(requestConfig).forEach((key) => {
      axios.defaults[key] = requestConfig[key];
    });
    axios.defaults.headers['Accept-language'] = 'zh-CN';
    this.setInterceptors(); // 拦截器
  }

  /** 拦截器设置
   *
   * Set Interceptors
   */
  setInterceptors() {
    let start = 0;
    axios.interceptors.request.use((config) => {
      const { url } = config;

      if (!exceptTokenUrls.includes(url)) {
        config.headers.Authorization = Storage.getItem('token');
      }

      start = +new Date();
      return config;
    });
    axios.defaults.timeout = 30000;
    axios.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        console.log(`#### ${url} 请求完成！`);
        console.log(`#### ${url} 本次请求耗时：`, +new Date() - start, 'ms');

        return response;
      },
      (error) => {
        if (error.message.includes('timeout')) {
          const message = '网络请求超时，请稍后再试！';
          // return
          return Promise.reject({ status: 503, message });
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  /**
   * Check the response status
   * @param res
   * @returns
   */
  checkApiStatus = (res) => {
    if (res.status >= 200 && res.status < 300) return res;
    // TODO: if status is 404 then redirect to 404 page
    // TODO: if status is 500 then redirect to 500 page
  };

  /**
   * handle response data format
   * @param res
   * @returns {Promise<{data: *, message: *, status: *}>}
   */
  handleResponseData = (res) => {
    const { data } = res;
    // const { url } = res.config;
    console.log('data', data);
    if (data.code === '8001') {
      return data;
    } else if (data.code === '401') {
      Message(data);
      return Promise.reject({ status: data.code, message: data.msg });
    } else {
      Message(data);
      // message.success('sdfsd');
      return Promise.reject({ status: data.code, message: data.msg });
      // return data
    }
  };

  /**
   * handle throw error
   * @param err
   * @returns {Promise<never>}
   */
  handleThrowError = (err) => {
    console.log('err', err);
    let statusText = '';
    // 响应时状态码处理
    if (err.response) {
      const status = err.response.status;
      statusText = codeMessage['zh-CN'][status] || err.response.statusText;
    } else {
      statusText = err.message;
    }

    return Promise.reject({
      name: 'Error',
      message: statusText,
      status: err.status || err.response.status,
    });
  };

  /**
   * based on method, use axios to handle request
   * @param url
   * @param options
   * @returns {Promise<AxiosResponse<T>>}
   */
  requestMethod(url, options = {}) {
    const { method = 'GET', data = {}, ...option } = options;
    const $method = method.toLocaleLowerCase(); // 统一标准小写
    axios.defaults.headers['Accept-language'] = 'zh-CN';
    switch (method) {
      case 'GET':
      case 'DELETE':
        return axios[$method](url, option);
      case 'PUT':
      case 'POST':
        return axios[$method](url, data, option);
      default:
        return axios.get(url, option);
    }
  }

  /**
   * Overall fetch method
   * @param url
   * @param options
   * @returns {Promise<{data: *, status: *} | never>}
   */
  fetch = (url, options) =>
    this.requestMethod(url, options)
      .then(this.checkApiStatus)
      .then(this.handleResponseData)
      .catch(this.handleThrowError);

  /**
   * handle POST request
   * @param url
   * @param options
   */
  post = (url, options = null) =>
    this.fetch(url, { ...options, method: 'POST' });

  /**
   * handle GET request
   * @param url
   * @param options
   */
  get = (url, options = null) => this.fetch(url, { ...options, method: 'GET' });

  /**
   * handle PUT request
   * @param url
   * @param options
   */
  put = (url, options) => this.fetch(url, { ...options, method: 'PUT' });

  /**
   * handle DELETE request
   * @param url
   * @param options
   */
  delete = (url, options = {}) =>
    this.fetch(url, { ...options, method: 'DELETE' });
}

export default new Request();
