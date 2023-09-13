import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ItemDetailsData } from '../../page/ItemDetails';
import { SalesListData } from '../../page/SalesList';
import { ItemData, categoryDataType } from '../../types';
import {
  getFavorites,
  getFavoritesCategories,
  getItemDetails,
  getItems,
  getSalesList,
  patchFavorite,
} from '../itemFetcher';

const ITEMS_QUERY_KEY = 'items';
const SALES_LIST_QUERY_KEY = 'salesList';
const FAVORITES_QUERY_KEY = 'favorites';
const DETAILS_QUERY_KEY = 'itemDetails';

export const useGetItemData = (categoryId?: number) => {
  return useInfiniteQuery<ItemData>(
    [ITEMS_QUERY_KEY, categoryId],
    ({ pageParam }) => getItems({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
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

export const useGetItemDetails = (itemId: number) => {
  return useQuery<ItemDetailsData>(
    [DETAILS_QUERY_KEY, itemId],
    () => getItemDetails(Number(itemId)),
    {
      enabled: Boolean(itemId),
    }
  );
};

export const usePatchFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation(patchFavorite, {
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.setQueryData<ItemDetailsData>(
        [DETAILS_QUERY_KEY, variables.itemId],
        prevData => {
          return prevData
            ? {
                ...prevData,
                isFavorite: data.isFavorite,
              }
            : prevData;
        }
      );
    },
  });
};
