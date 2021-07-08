import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useAuth } from '../../contexts/auth';
import themeGlobal from '../../styles/global';
import FacebookFunctions from '../../utils/facebook';

import {
  Container,
  ContainerUserData,
  ContainerAvatar,
  Avatar,
  ContainerUserInfo,
  TextNameUser,
  TextEmailUser,
  ContainerMenu,
  ContainerItemMenu,
  IconItemMenu,
  TextItemMenu,
} from './styles';

interface IMenu {
  name: string;
  icon: string;
  goTo(): void;
}

const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const signOutWithFacebook = useCallback(async () => {
    await FacebookFunctions.initFacebook();
    await FacebookFunctions.logOut();
    signOut();
  }, [signOut]);
  const menu: IMenu[] = [
    {
      name: 'Dados',
      icon: 'assignment-ind',
      goTo: useCallback(() => navigation.navigate('Product'), [navigation]),
    },
    {
      name: 'Endereços',
      icon: 'place',
      goTo: useCallback(() => navigation.navigate('Product'), [navigation]),
    },
    {
      name: 'Sobre a Leiteria',
      icon: 'store',
      goTo: useCallback(() => navigation.navigate('Product'), [navigation]),
    },
    {
      name: 'Sobre o App',
      icon: 'contact-support',
      goTo: useCallback(() => navigation.navigate('Product'), [navigation]),
    },
    {
      name: 'Sair',
      icon: 'logout',
      goTo: signOutWithFacebook,
    },
  ];

  return (
    <Container>
      <ContainerUserData>
        <ContainerAvatar>
          <Avatar source={{ uri: user.avatar_url }} />
        </ContainerAvatar>
        <ContainerUserInfo>
          <TextNameUser>{user.name}</TextNameUser>
          <TextEmailUser>{user.email}</TextEmailUser>
        </ContainerUserInfo>
      </ContainerUserData>
      <ContainerMenu>
        {menu.map((item) => (
          <ContainerItemMenu key={item.name} onPress={item.goTo}>
            <IconItemMenu
              name={item.icon}
              size={24}
              color={themeGlobal.colors.gray1}
            />
            <TextItemMenu>{item.name}</TextItemMenu>
          </ContainerItemMenu>
        ))}
      </ContainerMenu>
    </Container>
  );
};

export default SettingsScreen;
