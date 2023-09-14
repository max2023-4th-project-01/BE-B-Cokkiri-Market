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

const ITEMS_QUERY_KEY = 'items';
const SALES_LIST_QUERY_KEY = 'salesList';
const FAVORITES_QUERY_KEY = 'favorites';

export const useGetItemData = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [ITEMS_QUERY_KEY, categoryId],
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
      queryClient.invalidateQueries([ITEMS_QUERY_KEY]);
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
    [SALES_LIST_QUERY_KEY, nickname, isSold],
    ({ pageParam }) => getSalesList({ pageParam, nickname, isSold }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useGetFavorites = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [FAVORITES_QUERY_KEY, categoryId],
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
