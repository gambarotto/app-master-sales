import { useNavigation } from '@react-navigation/native';
import React from 'react';
import themeGlobal from '../../styles/global';
import { Container, ContainerBadge, IconCart, TextBadge } from './styles';

interface ICartButtonProps {
  qtyCartProducts?: number;
}

const CartButton: React.FC<ICartButtonProps> = ({ qtyCartProducts = 0 }) => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('Cart')}>
      {qtyCartProducts > 0 && (
        <ContainerBadge>
          <TextBadge>{qtyCartProducts}</TextBadge>
        </ContainerBadge>
      )}
      <IconCart
        name="shopping-cart"
        size={24}
        color={themeGlobal.colors.gray2}
      />
    </Container>
  );
};

export default CartButton;
