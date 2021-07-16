/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useSWRNative from '@nandorojo/swr-react-native';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWRNative<Data, Error>(url, async () => {
    const response = await api.get(url);
    return response.data;
  });
  return { data, error };
}
