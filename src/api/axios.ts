import axios from 'axios';
// withCredentials : 다른 도메인간에 쿠키를 전송하기 위해 true로 설정(백쪽도 작업필요)
// axios.defaults.withCredentials = true;

const ACCESS_TOKEN = '';

const axiosRequest = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // instance.interceptors.request.use((config) => {
  //   if (!config.headers) return config;
  //   config.headers.Authorization = `Bearer ${JSON.parse(ACCESS_TOKEN)}`;
  //   return config;
  // });
  return instance;
};

export const axiosMultiRequest = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  // instance.interceptors.request.use((config) => {
  //   if (!config.headers) return config;
  //   config.headers.Authorization = `Bearer ${JSON.parse(ACCESS_TOKEN)}`;
  //   return config;
  // });
  return instance;
};

export default axiosRequest;
