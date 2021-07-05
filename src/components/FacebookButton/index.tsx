import React, { useCallback } from 'react';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

import { ButtonFacebookLogin, Icon, TextFacebookButton } from './styles';
import { facebookApi } from '../../services/facebookApi';
import { config } from '../../config';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
// TODO refatorar
const FacebookButton: React.FC = () => {
  const { signIn } = useAuth();
  const logIn = useCallback(async (): Promise<void> => {
    try {
      const responseLogin = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      const params = 'id,name,email';
      if (responseLogin.type === 'success') {
        const response = await facebookApi.get(
          `/me?fields=${params}&access_token=${responseLogin.token}`,
        );
        const userId = response.data.id;
        const responseAvatar = await facebookApi.get(
          `/${userId}/picture?width=200&height=200&access_token=${responseLogin.token}`,
        );

        const responseApi = await api.post('users/fb', {
          name: response.data.name,
          email: response.data.email,
          password: response.data.email,
          avatar_social_media: responseAvatar.request.responseURL,
        });

        await signIn({
          email: responseApi.data.email,
          password: responseApi.data.email,
        });
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }, [signIn]);
  const logOut = useCallback(async (): Promise<void> => {
    await Facebook.logOutAsync();
  }, []);

  const toggleAuthAsync = useCallback(async (): Promise<void> => {
    await Facebook.initializeAsync({
      appId: config.facebookAppId,
    });
    const auth = await Facebook.getAuthenticationCredentialAsync();

    if (!auth) {
      logIn();
    } else {
      logOut();
    }
  }, [logIn, logOut]);

  return (
    <ButtonFacebookLogin onPress={toggleAuthAsync}>
      <Icon name="facebook" size={24} color="#fff" />
      <TextFacebookButton>Entrar com facebook</TextFacebookButton>
    </ButtonFacebookLogin>
  );
};

export default FacebookButton;
