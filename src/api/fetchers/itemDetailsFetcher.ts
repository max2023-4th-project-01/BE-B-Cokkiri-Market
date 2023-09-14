import { fetcher } from '../axios';
import { API_ENDPOINT } from '../endPoint';

export const getItemDetails = async (itemId: number) => {
  const res = await fetcher.get(`${API_ENDPOINT.ITEMS}/${itemId}`);

  return res.data;
};

export const getItemDetailsEdit = async (itemId: number) => {
  const res = await fetcher.get(`${API_ENDPOINT.ITEMS}/${itemId}/edit`);

  return res.data;
};

export const patchFavorite = async ({
  itemId,
  isFavorite,
}: {
  itemId: number;
  isFavorite: boolean;
}) => {
  const res = await fetcher.patch(`${API_ENDPOINT.ITEMS}/${itemId}/favorites`, {
    isFavorite,
  });

  return res.data;
};

export const patchStatus = async ({
  itemId,
  statusName,
}: {
  itemId: number;
  statusName: '판매중' | '예약중' | '판매완료';
}) => {
  const res = await fetcher.patch(`${API_ENDPOINT.ITEMS}/${itemId}/status`, {
    statusName,
  });

  return res.data;
};
