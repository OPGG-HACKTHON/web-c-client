/* eslint-disable no-param-reassign */
import axios from 'axios';

// 모든 요청에 Ajax 요청 헤더 추가
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.baseURL = process.env.API_BASE_URL;
// axios.defaults.withCredentials = true;
export const clientAxiosConfig = (config) => {
  const customHeaders = config.customHeaders || {};

  return {
    headers: {
      ...customHeaders,
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    maxContentLength: 50 * 1024 * 1024,
  };
};

export const axiosInterceptBeforeRequest = config => Object.assign(config, clientAxiosConfig(config));

const customAxios = axios.create({
  baseURL: process.env.API_BASE_URL,
});

customAxios.interceptors.request.use(axiosInterceptBeforeRequest);

export const operationAxios = axios.create({
  baseURL: process.env.OPERATION_API_BASE_URL,
});

operationAxios.interceptors.request.use(axiosInterceptBeforeRequest);

export const adminAxios = axios.create({
  baseURL: process.env.ADMIN_API_BASE_URL,
});

adminAxios.interceptors.request.use(axiosInterceptBeforeRequest);

export const recruitAxios = axios.create({
  baseURL: process.env.RECRUIT_API_BASE_URL,
});

recruitAxios.interceptors.request.use(axiosInterceptBeforeRequest);

export default customAxios;
