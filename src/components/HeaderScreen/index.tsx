import React from 'react';

import { Container, ImageLogo } from './styles';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import CartButton from '../CartButton';
import { useCart } from '../../contexts/cart';

const HeaderScreen: React.FC = () => {
  const { countCartProducts } = useCart();
  return (
    <Container>
      <ImageLogo source={logoImage} />
      <CartButton qtyCartProducts={countCartProducts} />
    </Container>
  );
};

export default HeaderScreen;
