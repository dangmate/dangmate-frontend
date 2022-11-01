import axios, { AxiosResponse } from 'axios';
// axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;

/**
 * login
 */

export interface LoginType {
  email: string;
  password: string;
}

export const requestLogin = (request: LoginType) => {
  return axios
    .post('/login', request)
    .then((res) => {
      const { accessToken } = res.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log(request);
    })
    .catch((err) => console.log(err));
};
