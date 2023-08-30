import { useQuery } from '@tanstack/react-query';
import { getUserLocations } from '../api/fetcher';
import { LocationData } from '../types';

export const QUERY_KEY = 'locations';

export const useLocationQuery = () => {
  return useQuery<LocationData>([QUERY_KEY], getUserLocations);
};
