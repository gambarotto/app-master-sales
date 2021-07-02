import React, { useCallback } from 'react';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

import { ButtonFacebookLogin, FacebookLogo } from './styles';
import { facebookApi } from '../../services/facebookApi';
import logo from '../../assets/facebook.png';
import { config } from '../../config';
// TODO refatorar
const FacebookButton: React.FC = () => {
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

        console.log(responseAvatar.request.responseURL);

        Alert.alert('Logged in!', `Hi ${(await response.data).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }, []);
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
      <FacebookLogo source={logo} />
    </ButtonFacebookLogin>
  );
};

export default FacebookButton;
