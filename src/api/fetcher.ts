import { fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getItem = async () => {
  const res = await fetcher.get(API_ENDPOINT.ITEMS);
  return res.data;
};

export const getCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.CATEGORIES);
  return res.data;
};
