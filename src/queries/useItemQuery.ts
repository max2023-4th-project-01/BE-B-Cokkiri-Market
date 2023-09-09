import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getFavoritesCategories,
  getFavoritesItemData,
  getItems,
} from '../api/mainFetcher';
import { ItemData, categoryDataType } from '../types';

const ITEMS_QUERY_KEY = '/items';

export const useGetItemData = (categoryId: number | null) => {
  return useInfiniteQuery<ItemData>(
    [ITEMS_QUERY_KEY, categoryId],
    ({ pageParam }) => getItems({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useGetFavoritesCategoryData = () => {
  return useQuery<categoryDataType, Error>(
    ['favoritesCategory'],
    getFavoritesCategories
  );
};

export const useGetFavoritesItemData = (categoryId?: number) => {
  return useQuery<ItemData, Error>(['favoritesItems', categoryId], () =>
    getFavoritesItemData(categoryId)
  );
};

// export const useGetItemData = (categoryId: number | null) => {
//   return useQuery<ItemData>([ITEMS_QUERY_KEY, categoryId], () =>
//     getItems({ categoryId })
//   );
// };
