import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ItemDetailsData } from '../../page/ItemDetails';
import {
  getItemDetails,
  patchFavorite,
  patchStatus,
} from '../fetchers/itemDetailsFetcher';
import { QUERY_KEY } from './queryKeys';

export const useGetItemDetails = (itemId: number) => {
  return useQuery<ItemDetailsData>(
    [QUERY_KEY.ITEM_DETAILS, itemId],
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
      queryClient.setQueryData<ItemDetailsData>(
        [QUERY_KEY.ITEM_DETAILS, variables.itemId],
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

export const usePatchStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(patchStatus, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData<ItemDetailsData>(
        [QUERY_KEY.ITEM_DETAILS, variables.itemId],
        prevData => {
          return prevData
            ? {
                ...prevData,
                status: prevData.status.map(status => {
                  return {
                    ...status,
                    isSelected: status.name === data.statusName,
                  };
                }),
              }
            : prevData;
        }
      );
    },
  });
};
