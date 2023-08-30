import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteUserLocation, selectUserLocation } from '../api/fetcher';
import { LocationData } from '../types';
import { QUERY_KEY as locationQueryKey } from './useLocationQuery';

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserLocation, {
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<LocationData>([locationQueryKey], prevData => {
        return prevData
          ? {
              locations: prevData?.locations.filter(
                location => location.id !== locationId
              ),
            }
          : prevData;
      });
    },
    // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries(['todos']);
    // },
  });
};

export const useSelectLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(selectUserLocation, {
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<LocationData>([locationQueryKey], prevData => {
        if (!prevData) return;
        return {
          locations: prevData.locations.map(location => ({
            ...location,
            isSelected: location.id === locationId,
          })),
        };
      });
    },
  });
};
