import React from 'react';

import { Container, ContainerCart, IconCart, ImageLogo } from './styles';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import themeGlobal from '../../styles/global';

const HeaderScreen: React.FC = () => (
  <Container>
    <ImageLogo source={logoImage} />
    <ContainerCart>
      <IconCart
        name="shopping-cart"
        size={24}
        color={themeGlobal.colors.gray2}
      />
    </ContainerCart>
  </Container>
);

export default HeaderScreen;
