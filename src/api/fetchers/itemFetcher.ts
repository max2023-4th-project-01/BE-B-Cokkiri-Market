import { BASE_URL, fetcher } from '../axios';
import { API_ENDPOINT } from '../endPoint';

export const getItems = async ({
  pageParam: cursor,
  categoryId,
}: {
  pageParam: number;
  categoryId?: number;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.ITEMS);

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  categoryId !== undefined &&
    url.searchParams.append('categoryId', String(categoryId));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const deleteItem = async (itemId: number) => {
  const res = await fetcher.delete(`${API_ENDPOINT.ITEMS}/${itemId}`);

  return res.data;
};

export const getSalesList = async ({
  pageParam: cursor,
  isSold,
  nickname,
}: {
  pageParam?: number;
  isSold?: boolean;
  nickname: string;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.SALES_LIST(nickname));

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  isSold !== undefined && url.searchParams.append('isSold', String(isSold));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getFavorites = async ({
  pageParam: cursor,
  categoryId,
}: {
  pageParam?: number;
  categoryId?: number;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.FAVORITES);

  cursor !== undefined && url.searchParams.append('cursor', String(cursor));
  categoryId !== undefined &&
    url.searchParams.append('categoryId', String(categoryId));

  const res = await fetcher.get(url.toString());

  return res.data;
};

export const getFavoritesCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.FAVORITES_CATEGORY);

  return res.data;
};

export const getRecommendCategories = async (title: string) => {
  const res = await fetcher.get(
    `${API_ENDPOINT.RECOMMENDED_CATEGORIES}?title=${title}`
  );

  return res.data;
};

export const getCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.CATEGORIES);

  return res.data;
};

export const addItems = async (formData: FormData) => {
  const res = await fetcher.post(API_ENDPOINT.ITEMS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const editItems = async (formData: FormData, itemId: number) => {
  const res = await fetcher.put(`${API_ENDPOINT.ITEMS}/${itemId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};
