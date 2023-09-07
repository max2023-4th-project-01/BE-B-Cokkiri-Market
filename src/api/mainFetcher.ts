import { fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

// useInfiniteQuery 제대로 동작 안하는 오류 해결 필요
export const getItems = async ({
  pageParam: cursor,
  categoryId,
}: {
  pageParam?: number;
  categoryId?: number | null;
}) => {
  const API_URI = `${API_ENDPOINT.ITEMS}${cursor ? `?cursor=${cursor}&` : ''}${
    categoryId ? `categoryId=${categoryId}` : ''
  }`;
  const res = await fetcher.get(API_URI);
  return res.data;
};

// export const getItems = async ({
//   cursor,
//   categoryId,
// }: {
//   cursor?: number;
//   categoryId?: number | null;
// }) => {
//   const res = await fetcher.get(
//     `${API_ENDPOINT.ITEMS}${categoryId ? `?categoryId=${categoryId}` : ''}`
//   );
//   return res.data;
// };

export const getCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.CATEGORIES);
  return res.data;
};
