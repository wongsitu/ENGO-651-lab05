import { AxiosError } from 'axios';
import { QueryKey, UseQueryOptions } from 'react-query';
import { z } from 'zod';
import { LocationsSchema } from './schema';

export type LocationsResponse = z.infer<typeof LocationsSchema>;

export interface LocationsVariables
  extends Omit<
    UseQueryOptions<LocationsResponse, AxiosError, LocationsResponse, QueryKey>,
    'queryFn'
  > {
  startDate?: string;
  endDate?: string;
}
