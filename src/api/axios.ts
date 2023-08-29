import axios from 'axios';
const BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
