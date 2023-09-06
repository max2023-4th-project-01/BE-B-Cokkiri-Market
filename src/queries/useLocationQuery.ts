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
} from '../api/locationFetcher';
import { UserLocationData, LocationResultData } from '../types';

const USER_LOCATION_QUERY_KEY = '/users/locations';
const LOCATION_QUERY_KEY = '/locations';

// 홈: 동네설정 지역리스트 검색
export const useGetLocationResult = (searchParam: string) => {
  return useInfiniteQuery<LocationResultData>(
    [LOCATION_QUERY_KEY],
    ({ pageParam = 0 }) => getLocationData({ pageParam, searchParam }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};

// 홈: 동네설정 내 동네 목록 불러오기
export const useGetUserLocation = () => {
  return useQuery<UserLocationData>(
    [USER_LOCATION_QUERY_KEY],
    getUserLocations
  );
};

// 홈: 동네설정 내 동네 추가하기
export const useAddUserLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(addUserLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_LOCATION_QUERY_KEY]);
    },
  });
};

// 홈: 동네설정 내 동네 삭제하기
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
  });
};

// 홈: 동네설정 내 동네 선택하기
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
