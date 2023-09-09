import axios from 'axios';

const currentPort = window.location.port;

export const BASE_URL = import.meta.env.DEV
  ? `http://localhost:${currentPort}`
  : import.meta.env.VITE_API_URL;

export const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Refresh-Token': 'your-refresh-token-value',
  },
});

fetcher.interceptors.request.use(
  config => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return config;

    const accessToken = JSON.parse(authStorage).state.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
