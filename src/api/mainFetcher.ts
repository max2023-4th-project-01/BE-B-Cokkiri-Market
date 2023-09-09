import { BASE_URL, fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

// useInfiniteQuery 제대로 동작 안하는 오류 해결 필요
export const getItems = async ({
  pageParam: cursorParam,
  categoryId,
}: {
  pageParam: number;
  categoryId: number | null;
}) => {
  const url = new URL(BASE_URL + API_ENDPOINT.ITEMS);

  cursorParam !== undefined &&
    url.searchParams.append('cursor', String(cursorParam));
  categoryId !== undefined &&
    url.searchParams.append('categoryId', String(categoryId));

  const res = await fetcher.get(url.toString());

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

export const getFavoritesCategories = async () => {
  const res = await fetcher.get(API_ENDPOINT.FAVORITES_CATEGORY);
  return res.data;
};

export const getFavoritesItemData = async (categoryId?: number) => {
  const res = await fetcher.get(API_ENDPOINT.FAVORITES_HISTORY(categoryId));
  return res.data;
};
