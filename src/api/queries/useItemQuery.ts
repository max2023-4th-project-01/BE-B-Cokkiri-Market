import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ItemData, categoryDataType } from '../../types';
import {
  getFavoritesCategories,
  getFavoritesItemData,
  getItems,
} from '../mainFetcher';

const ITEMS_QUERY_KEY = 'items';
const SALES_LIST_QUERY_KEY = 'salesList';
const FAVORITES_QUERY_KEY = 'favorites';

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
