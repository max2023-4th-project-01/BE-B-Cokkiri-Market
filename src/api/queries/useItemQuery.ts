import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SalesListData } from '../../page/SalesList';
import { CategoryData, FavoritesCategoryDataType, ItemData } from '../../types';
import { patchStatus } from '../fetchers/itemDetailsFetcher';
import {
  deleteItem,
  getCategories,
  getFavorites,
  getFavoritesCategories,
  getItems,
  getRecommendCategories,
  getSalesList,
} from '../fetchers/itemFetcher';

export const ITEMS_QUERY_KEY = 'items';
const CATEGORY_QUERY_KEY = 'category';
const SALES_LIST_QUERY_KEY = 'salesList';
const FAVORITES_QUERY_KEY = 'favorites';
const RECOMMEND_CATEGORY = 'recommendCategory';
const FAVORITES_CATEGORY = 'favoritesCategory';

export const useGetItemData = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [ITEMS_QUERY_KEY, categoryId],
    ({ pageParam }) => getItems({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

export const useDeleteItem = (
  refetchTarget: 'home' | 'favorites' | 'salesList'
) => {
  const queryClient = useQueryClient();
  const key = {
    home: ITEMS_QUERY_KEY,
    favorites: FAVORITES_QUERY_KEY,
    salesList: SALES_LIST_QUERY_KEY,
  };

  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([key[refetchTarget]]);
    },
  });
};

export const useGetCategoryData = () => {
  return useQuery<CategoryData>([CATEGORY_QUERY_KEY], getCategories, {
    staleTime: Infinity,
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
  return useQuery<FavoritesCategoryDataType>(
    [FAVORITES_CATEGORY],
    getFavoritesCategories
  );
};

export const useGetRecommendCategoryData = (title: string) => {
  return useQuery<CategoryData>(
    [RECOMMEND_CATEGORY],
    () => getRecommendCategories(title),
    {
      enabled: false,
    }
  );
};

export const useResetRecommendCategory = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.resetQueries({
      queryKey: [RECOMMEND_CATEGORY],
    });
};

export const usePatchItemStatus = (
  refetchTarget: 'home' | 'favorites' | 'salesList'
) => {
  const queryClient = useQueryClient();
  const key = {
    home: ITEMS_QUERY_KEY,
    favorites: FAVORITES_QUERY_KEY,
    salesList: SALES_LIST_QUERY_KEY,
  };

  return useMutation(patchStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([key[refetchTarget]]);
    },
  });
};
