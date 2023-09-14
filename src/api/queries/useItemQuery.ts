import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SalesListData } from '../../page/SalesList';
import { ItemData, categoryDataType } from '../../types';
import {
  deleteItem,
  getFavorites,
  getFavoritesCategories,
  getItems,
  getSalesList,
} from '../fetchers/itemFetcher';
import { QUERY_KEY } from './queryKeys';

export const useGetItemData = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [QUERY_KEY.ITEMS, categoryId],
    ({ pageParam }) => getItems({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.ITEMS]);
    },
  });
};

export const useGetSalesList = ({
  nickname,
  isSold,
}: {
  nickname: string;
  isSold?: boolean;
}) => {
  return useInfiniteQuery<SalesListData>(
    [QUERY_KEY.SALES_LIST, nickname, isSold],
    ({ pageParam }) => getSalesList({ pageParam, nickname, isSold }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useGetFavorites = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [QUERY_KEY.FAVORITES, categoryId],
    ({ pageParam }) => getFavorites({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useGetFavoritesCategoryData = () => {
  return useQuery<categoryDataType>(
    ['favoritesCategory'],
    getFavoritesCategories
  );
};
