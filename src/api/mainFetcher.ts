import { fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

export const getItems = async ({
  pageParam,
  categoryId,
}: {
  pageParam: number;
  categoryId: number;
}) => {
  const res = await fetcher.get(
    `${API_ENDPOINT.ITEMS}?categoryId=${categoryId}&cursor=${pageParam}`
  );
  return res.data;
};

export const getCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.CATEGORIES);
  return res.data;
};
