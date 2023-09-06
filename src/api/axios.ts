import axios from 'axios';
const BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL;

export const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

fetcher.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
