import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getUserLocations,
  deleteUserLocation,
  selectUserLocation,
} from '../api/fetcher';
import { UserLocationData } from '../types';

export const QUERY_KEY = '/users/locations';

export const useGetUserLocation = () => {
  return useQuery<UserLocationData>([QUERY_KEY], getUserLocations);
};

export const useDeleteUserLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserLocation, {
    // onSuccess의 첫번쨰 인자 data, 두번째 인자 mutate()로 넘겨준 variables
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<UserLocationData>([QUERY_KEY], prevData => {
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

export const useSelectUserLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(selectUserLocation, {
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<UserLocationData>([QUERY_KEY], prevData => {
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
