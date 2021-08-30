/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import useSWRNative from '@nandorojo/swr-react-native';
import { useQuery } from 'react-query';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(key: string, url: string) {
  const { data, error, isLoading } = useQuery<Data, Error>(key, async () => {
    const response = await api.get(url);
    return response.data;
  });

  return { data, error, isLoading };
}

// interface SWRResponse {
//   data: object;
//   error: object;
// }
// export async function useFetch<Data = any, Error = any>(
//   url: string,
// ): Promise<SWRResponse> {
//   // const response = await api.get(url);
//   // console.log(response.data, url);

//   // return response;

//   const { data, error } = useSWRNative<Data, Error>(url, async () => {
//     const response = await api.get(url);
//     console.log(data, url);

//     return response.data;
//   });

//   return { data, error };
// }
