import { useInfiniteQuery } from '@tanstack/react-query';
import { getItems } from '../api/mainFetcher';
import { ItemData } from '../types';

const ITEMS_QUERY_KEY = '/items';

export const useGetItemData = (categoryId: number | null) => {
  return useInfiniteQuery<ItemData>(
    [ITEMS_QUERY_KEY],
    ({ pageParam = 1 }) => getItems({ pageParam, categoryId }),
    {
      getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    }
  );
};
