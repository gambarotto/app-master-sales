import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import { ButtonFacebookLogin, Icon, TextFacebookButton } from './styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import FacebookFunctions from '../../utils/facebook';
// TODO refatorar
const FacebookButton: React.FC = () => {
  const { signIn } = useAuth();
  const logIn = useCallback(async (): Promise<void> => {
    try {
      const facebookResponse = await FacebookFunctions.logIn();
      if (facebookResponse) {
        const responseApi = await api.post('users/fb', {
          name: facebookResponse.name,
          email: facebookResponse.email,
          password: facebookResponse.password,
          avatar_social_media: facebookResponse.avatar_social_media,
        });
        await signIn({
          email: responseApi.data.email,
          password: responseApi.data.email,
          fb: true,
        });
      }
    } catch ({ message }) {
      Alert.alert(`Error - ${message}`);
    }
  }, [signIn]);

  return (
    <ButtonFacebookLogin onPress={logIn}>
      <Icon name="facebook" size={24} color="#fff" />
      <TextFacebookButton>Entrar com facebook</TextFacebookButton>
    </ButtonFacebookLogin>
  );
};

export default FacebookButton;
