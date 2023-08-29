import { API_ENDPOINT } from './endPoint';

export const getItem = async () => {
  const res = await fetch(API_ENDPOINT.ITEMS);

  return res.json();
};
