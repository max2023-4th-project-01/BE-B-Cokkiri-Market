import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
    [LOCATION_QUERY_KEY, searchParam],
    ({ pageParam = 1 }) => getLocationData({ pageParam, searchParam }),
    {
      getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
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
    onSuccess: data => {
      queryClient.setQueryData<UserLocationData>(
        [USER_LOCATION_QUERY_KEY],
        prevData => {
          return prevData
            ? {
                locations: [...prevData.locations, data],
              }
            : prevData;
        }
      );
    },
    onError: (error: AxiosError) => {
      const statueCode = error?.response?.status;
      if (statueCode === 500) {
        // TODO: 토스트 메세지로 에러 표시
        console.log('서버에서 요청이 제대로 처리되지 못했습니다.');
      }
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
