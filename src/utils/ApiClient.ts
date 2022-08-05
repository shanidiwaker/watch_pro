import axios from 'axios';
import {store} from '../redux/store';

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ROUTES = ['login', 'register', 'check-username'];

client.interceptors.request.use(
  (request: any) => {
    const authRoutes = AUTH_ROUTES.some(i => request.url.includes(i));
    const {token} = store.getState().user;
    if (!authRoutes) {
      // TODO: add token to secure request
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error: any) => {

    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response: any) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  (error: any) => {
    if (error.response?.status === 401) {
      // TODO: handle expired token
    }
    return Promise.reject(error.response?.data);
  },
);

export default client;
