import { fetcher } from './axios';
import { API_ENDPOINT } from './endPoint';

// useInfiniteQuery 제대로 동작 안하는 오류 해결 필요
export const getItems = async ({
  pageParam: cursorParam,
  categoryId,
}: {
  pageParam: number;
  categoryId: number | null;
}) => {
  const queryString =
    cursorParam && categoryId
      ? `?cursor=${cursorParam}&categoryId=${categoryId}`
      : cursorParam
      ? `?cursor=${cursorParam}`
      : categoryId
      ? `?categoryId=${categoryId}`
      : '';

  const res = await fetcher.get(`${API_ENDPOINT.ITEMS}${queryString}`);
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
