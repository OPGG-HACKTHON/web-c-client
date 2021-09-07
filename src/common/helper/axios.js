/* eslint-disable no-param-reassign */
import axios from 'axios';

// 모든 요청에 Ajax 요청 헤더 추가
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.baseURL = process.env.API_BASE_URL;

// TODO: test 서버 만들어 로컬에서 http 로 연결 가능케 한 이후에는 활성화 필요
// axios.defaults.withCredentials = true;
export const clientAxiosConfig = (config) => {
  const customHeaders = config.customHeaders || {};

  return {
    headers: {
      ...customHeaders,
      'X-Requested-With': 'XMLHttpRequest',
    },
    // withCredentials: true,
    maxContentLength: 50 * 1024 * 1024,
  };
};

export const axiosInterceptBeforeRequest = config => Object.assign(config, clientAxiosConfig(config));

const customAxios = axios.create({
  baseURL: process.env.API_BASE_URL,
});

customAxios.interceptors.request.use(axiosInterceptBeforeRequest);

export default customAxios;
