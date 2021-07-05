import React from 'react';
import { useAuth } from '../../contexts/auth';
import logoImage from '../../assets/logo_horizontal_catarina.png';

import {
  Container,
  ContainerCart,
  ContainerHeader,
  ContainerImageAndCart,
  ContainerSearch,
  IconCart,
  IconSearch,
  ImageLogo,
  InputSearch,
} from './styles';
import themeGlobal from '../../styles/global';

const HomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <ContainerHeader>
        <ContainerImageAndCart>
          <ImageLogo source={logoImage} />
          <ContainerCart>
            <IconCart
              name="shopping-cart"
              size={24}
              color={themeGlobal.colors.gray2}
            />
          </ContainerCart>
        </ContainerImageAndCart>
        <ContainerSearch>
          <IconSearch
            name="search"
            size={24}
            color={themeGlobal.colors.gray2}
          />
          <InputSearch placeholder="Pesquisar" />
        </ContainerSearch>
      </ContainerHeader>
    </Container>
  );
};

export default HomeScreen;
