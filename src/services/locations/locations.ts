import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getLocations } from './requests';
import { LocationsResponse, LocationsVariables } from './types';

export const useLocations = ({
  startDate,
  endDate,
  ...opts
}: LocationsVariables = {}) => {
  const { status, refetch, data } = useQuery<LocationsResponse, AxiosError>(
    ['getLocations', { startDate, endDate }],
    getLocations,
    {
      ...opts,
      enabled: !!startDate && !!endDate,
    },
  );

  const locations = data?.features || [];

  return { status, refetch, locations };
};
