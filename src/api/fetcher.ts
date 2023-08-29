import { LocationData } from '../types';
import axios, { axiosAuth } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getItem = async () => {
  const res = await axios.get(API_ENDPOINT.ITEM);
  return res.data;
};

export const getLocationData = async (): Promise<LocationData> => {
  const res = await axiosAuth.get(API_ENDPOINT.USER_LOCATION);
  return res.data;
};
