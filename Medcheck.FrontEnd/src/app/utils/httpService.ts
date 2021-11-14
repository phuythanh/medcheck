import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../apis/common/constants';
const qs = require('qs');
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
    if (token) {
      config.headers.common['Authorization'] = `${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      // errorBox(
      //   error.response.data.error.message,
      //   error.response.data.error.message
      // );
      console.error('Invalid data type');
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
      // errorBox("Error", error.response.data.error.message);
      console.error('Invalid data type');
    } else if (!error.response) {
      // errorBox("", "Error");
      console.error('Invalid data type');
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
