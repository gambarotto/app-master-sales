/* eslint-disable class-methods-use-this */
import * as Facebook from 'expo-facebook';
import { config } from '../config';
import { facebookApi } from '../services/facebookApi';

interface IResponseFacebook {
  name: string;
  email: string;
  password: string;
  avatar_social_media: string;
}

export default class FacebookFunctions {
  static async initFacebook(): Promise<void> {
    await Facebook.initializeAsync({
      appId: config.facebookAppId,
    });
  }

  static async getAuthenticate(): Promise<Facebook.FacebookAuthenticationCredential | null> {
    return Facebook.getAuthenticationCredentialAsync();
  }

  static async logIn(): Promise<IResponseFacebook | undefined> {
    let responseDataFacebook;
    await this.initFacebook();
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

      responseDataFacebook = {
        name: response.data.name,
        email: response.data.email,
        password: response.data.email,
        avatar_social_media: responseAvatar.request.responseURL,
      };
    }
    return responseDataFacebook;
  }

  static async logOut(): Promise<void> {
    await Facebook.logOutAsync();
  }
}
