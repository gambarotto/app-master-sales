/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import api from '../services/api';

interface IUseSend {
  dataSend: any;
  url: string;
  keyToInvalidate?: string;
  onMutateAction?(): (variables: void) => void;
}

export default async function usePost({
  dataSend,
  url,
  keyToInvalidate,
  onMutateAction,
}: IUseSend) {
  const queryClient = useQueryClient();

  const responseMutation = useMutation(async () => api.post(url, dataSend), {
    onSuccess: () => {
      queryClient.invalidateQueries(keyToInvalidate);
    },
    onMutate: onMutateAction || undefined,
  });
  return responseMutation;
}
