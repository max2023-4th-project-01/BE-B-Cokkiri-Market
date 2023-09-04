import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getUserLocations,
  getLocationData,
  addUserLocation,
  deleteUserLocation,
  selectUserLocation,
} from '../api/fetcher';
import { UserLocationData, LocationResultData } from '../types';

const USER_LOCATION_QUERY_KEY = '/users/locations';
const LOCATION_QUERY_KEY = '/locations';

export const useGetLocationResult = (searchParam: string) => {
  return useInfiniteQuery<LocationResultData>(
    [LOCATION_QUERY_KEY],
    ({ pageParam = 0 }) => getLocationData({ pageParam, searchParam }),
    {
      getNextPageParam: lastPage => lastPage.nextId ?? undefined,
    }
  );
};

export const useGetUserLocation = () => {
  return useQuery<UserLocationData>(
    [USER_LOCATION_QUERY_KEY],
    getUserLocations
  );
};

export const useAddUserLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(addUserLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_LOCATION_QUERY_KEY]);
    },
  });
};

export const useDeleteUserLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUserLocation, {
    // onSuccess의 첫번쨰 인자 data, 두번째 인자 mutate()로 넘겨준 variables
    onSuccess: (_, locationId) => {
      queryClient.setQueryData<UserLocationData>(
        [USER_LOCATION_QUERY_KEY],
        prevData => {
          return prevData
            ? {
                locations: prevData?.locations.filter(
                  location => location.id !== locationId
                ),
              }
            : prevData;
        }
      );
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
      queryClient.setQueryData<UserLocationData>(
        [USER_LOCATION_QUERY_KEY],
        prevData => {
          if (!prevData) return;
          return {
            locations: prevData.locations.map(location => ({
              ...location,
              isSelected: location.id === locationId,
            })),
          };
        }
      );
    },
  });
};
