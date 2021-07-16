import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useAuth } from '../../contexts/auth';
import themeGlobal from '../../styles/global';
import FacebookFunctions from '../../utils/facebook';
import ModalEditProfile from './ModalEditProfile';

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
  const [modalProfile, setModalProfile] = useState(false);

  const signOutWithFacebook = useCallback(async () => {
    await FacebookFunctions.initFacebook();
    await FacebookFunctions.logOut();
    signOut();
  }, [signOut]);
  const handleOpenModal = useCallback(() => {
    setModalProfile((state) => !state);
  }, []);
  const menu: IMenu[] = [
    {
      name: 'Dados',
      icon: 'assignment-ind',
      goTo: handleOpenModal,
    },
    {
      name: 'Endereços',
      icon: 'place',
      goTo: useCallback(() => navigation.navigate('Adresses'), [navigation]),
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
      <Modal isVisible={modalProfile}>
        <ModalEditProfile setModalIsOpen={handleOpenModal} />
      </Modal>
    </Container>
  );
};

export default SettingsScreen;
