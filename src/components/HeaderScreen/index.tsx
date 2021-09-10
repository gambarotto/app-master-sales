import React from 'react';

import { Container, ImageLogo } from './styles';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import CartButton from '../CartButton';
import { useCart } from '../../contexts/cart';

interface Props {
  cartButton?: boolean;
}

const HeaderScreen: React.FC<Props> = ({ cartButton = true }) => {
  const { countCartProducts } = useCart();
  return (
    <Container>
      <ImageLogo source={logoImage} />
      {cartButton && <CartButton qtyCartProducts={countCartProducts} />}
    </Container>
  );
};

export default HeaderScreen;
