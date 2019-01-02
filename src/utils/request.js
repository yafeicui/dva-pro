import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

export function createHttp(app) {
  initInterceptersRequest();
  initInterceptersResponse(app);
}
const initInterceptersRequest = () => {
  axios.interceptors.request.use(config => {
    const CONFIG = config;
    CONFIG.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    CONFIG.data = qs.stringify(CONFIG.data);
    return CONFIG;
  });
};

const initInterceptersResponse = app => {
  axios.interceptors.response.use(
    res => {
      const { data } = res;
      if (data.ret !== undefined && data.ret !== 0) {
        message.error(data.msg);
        return Promise.reject(data.msg);
      }

      return data;
    },
    ({ response }) => {
      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }
      let msg = response.data.msg;
      message.error(msg);
      return Promise.reject(msg);
    }
  );
};
