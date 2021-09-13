/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation } from 'react-query';
import api from '../services/api';

export default async function useSend(dataSend: any, url: string) {
  const { isLoading, isSuccess, data } = useMutation(async () => {
    const response = await api.post(url, dataSend);
    return response.data;
  });
  return { isLoading, isSuccess, data };
}
