import { LocationData } from '../types';
import { API_ENDPOINT } from './endPoint';

const accessToken = localStorage.getItem('accessToken');

export const getItem = async () => {
  const res = await fetch(API_ENDPOINT.ITEM);

  return res.json();
};

export const fetchLocationData = async (): Promise<LocationData> => {
  const res = await fetch('/api/users/locations', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
};
