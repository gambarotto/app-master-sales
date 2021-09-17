import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import { useMutation } from 'react-query';
import { ButtonFacebookLogin, Icon, TextFacebookButton } from './styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import FacebookFunctions from '../../utils/facebook';
// TODO refatorar

interface Data {
  name: string;
  email: string;
  password: string;
  avatar_social_media: string;
}
const FacebookButton: React.FC = () => {
  const { signIn } = useAuth();

  const fbMutations = useMutation(
    async (data: Data) => api.post('users/fb', data),
    {
      onSuccess: async (responseApi) => {
        await signIn({
          email: responseApi.data.email,
          password: responseApi.data.email,
          fb: true,
        });
      },
    },
  );
  const handleLogIn = useCallback(async (): Promise<void> => {
    try {
      const facebookResponse = await FacebookFunctions.logIn();
      if (facebookResponse) {
        fbMutations.mutate({
          name: facebookResponse.name,
          email: facebookResponse.email,
          password: facebookResponse.password,
          avatar_social_media: facebookResponse.avatar_social_media,
        });
      }
    } catch ({ message }) {
      Alert.alert(`Error - ${message}`);
    }
  }, [fbMutations]);

  return (
    <ButtonFacebookLogin onPress={handleLogIn}>
      <Icon name="facebook" size={24} color="#fff" />
      <TextFacebookButton>Entrar com facebook</TextFacebookButton>
    </ButtonFacebookLogin>
  );
};

export default FacebookButton;
