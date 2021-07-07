import React from 'react';
import { useAuth } from '../../contexts/auth';
import themeGlobal from '../../styles/global';

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
}

const SettingsScreen: React.FC = () => {
  const { user } = useAuth();

  const menu: IMenu[] = [
    {
      name: 'Dados',
      icon: 'assignment-ind',
    },
    {
      name: 'Endereços',
      icon: 'place',
    },
    {
      name: 'Sobre a Leiteria',
      icon: 'store',
    },
    {
      name: 'Sobre o App',
      icon: 'contact-support',
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
          <ContainerItemMenu key={item.name}>
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
