import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { Notification } from '@douyinfe/semi-ui';

export interface ResponseType {
  code: number;
  msg: string;
  data: any;
}

axios.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      Notification.error({
        duration: 2,
        position: 'top',
        content: response.data.msg,
      });
    }
    return response.data;
  },
  function (error) {
    Notification.error({
      duration: 2,
      position: 'top',
      content: error && error.message,
      title: 'Http Request Error',
    });
    return Promise.reject(error);
  },
);

const request = {
  get: (url: string, params?: any, options?: AxiosRequestConfig) => {
    let path = url;
    if (qs.stringify(params)) {
      path += `?${qs.stringify(params)}`;
    }
    return axios.get<any, ResponseType>(path, options);
  },
  delete: (url: string, params?: any, options?: AxiosRequestConfig) => {
    let path = url;
    if (qs.stringify(params)) {
      path = `?${qs.stringify(params)}`;
    }
    return axios.delete<any, ResponseType>(path, options);
  },
  post: (url: string, params?: any, options?: AxiosRequestConfig) =>
    axios.post<any, ResponseType>(url, params, options),
  put: (url: string, params?: any, options?: AxiosRequestConfig) =>
    axios.put<any, ResponseType>(url, params, options),
};

export default request;
