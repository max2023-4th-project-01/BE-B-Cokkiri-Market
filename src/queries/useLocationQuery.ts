import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getUserLocations,
  deleteUserLocation,
  selectUserLocation,
} from '../api/fetcher';
import { LocationData } from '../types';

export const QUERY_KEY = 'locations';

export const useLocationQuery = () => {
  return useQuery<LocationData>([QUERY_KEY], getUserLocations);
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserLocation, {
    // onSuccess의 첫번쨰 인자 data, 두번째 인자 mutate()로 넘겨준 variables
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<LocationData>([QUERY_KEY], prevData => {
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
      queryClient.setQueryData<LocationData>([QUERY_KEY], prevData => {
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
