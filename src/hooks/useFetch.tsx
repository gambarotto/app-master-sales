/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from 'react-query';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(key: string, url: string) {
  const { data, error, isLoading } = useQuery<Data, Error>(key, async () => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error, isLoading };
}
