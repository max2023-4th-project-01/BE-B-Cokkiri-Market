import { UserLocationData } from '../types';
import axios, { axiosAuth } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getItem = async () => {
  const res = await axios.get(API_ENDPOINT.ITEMS);
  return res.data;
};

export const getUserLocations = async (): Promise<UserLocationData> => {
  const res = await axiosAuth.get(API_ENDPOINT.USER_LOCATION);
  return res.data;
};

export const getLocationData = async () => {
  const res = await axios.get(API_ENDPOINT.LOCATION_DATA);
  return res.data;
};

export const addUserLocation = async (locationName: string) => {
  const res = await axiosAuth.post(API_ENDPOINT.USER_LOCATION, {
    name: locationName,
  });
  return res.data;
};

export const selectUserLocation = async (locationId: number) => {
  const res = await axiosAuth.patch(
    `${API_ENDPOINT.USER_LOCATION}/${locationId}`
  );
  return res.data;
};

export const deleteUserLocation = async (locationId: number) => {
  const res = await axiosAuth.delete(
    `${API_ENDPOINT.USER_LOCATION}/${locationId}`
  );
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(API_ENDPOINT.CATEGORIES);
  return res.data;
};
