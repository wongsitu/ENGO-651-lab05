import { QueryFunction, QueryKey } from 'react-query';
import API from '../api';
import { LocationsSchema } from './schema';
import { LocationsResponse } from './types';

export const getLocations: QueryFunction<LocationsResponse, QueryKey> = async ({
  queryKey,
}) => {
  const [, { startDate, endDate }] = queryKey as [
    unknown,
    { startDate: string; endDate: string },
  ];

  return API.get(`https://data.calgary.ca/resource/c2es-76ed.geojson`, {
    params: {
      $where: `issueddate > '${startDate}' and issueddate < '${endDate}'`,
    },
  }).then((result) => LocationsSchema.parse(result.data));
};
