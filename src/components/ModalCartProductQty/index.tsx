import React, { useCallback, useMemo, useState } from 'react';
import { ICartProduct, useCart } from '../../contexts/cart';
import themeGlobal from '../../styles/global';

import {
  Container,
  TitleModal,
  ContainerQuantityAndButton,
  ContainerQuantity,
  ContainerAction,
  Icon,
  Quantity,
  ButtonConfirm,
  TextButtonConfirm,
  ContainerTextQuantity,
} from './styles';

interface Props {
  handleModal(): void;
  item: {
    product: ICartProduct;
    quantity: number;
  };
}

const ModalCartProductQty: React.FC<Props> = ({ handleModal, item }) => {
  const { handleProduct } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveQty = useCallback(() => {
    if (quantity > 0) {
      setQuantity((state) => state - 1);
    }
  }, [quantity]);
  const handleAddQty = useCallback(() => {
    setQuantity((state) => state + 1);
  }, []);
  const handleCartProduct = useCallback(() => {
    handleProduct(Object.assign(item, { quantity }));
    handleModal();
  }, [handleModal, handleProduct, item, quantity]);

  const changeName = useMemo(
    () => (quantity === 0 ? 'Remover' : 'Atualizar'),
    [quantity],
  );
  return (
    <Container>
      <TitleModal>{item.product.name}</TitleModal>
      <ContainerQuantityAndButton>
        <ContainerQuantity>
          <ContainerAction onPress={handleRemoveQty}>
            <Icon
              name="remove"
              size={24}
              color={themeGlobal.colors.secondary}
            />
          </ContainerAction>
          <ContainerTextQuantity>
            <Quantity>{quantity}</Quantity>
          </ContainerTextQuantity>
          <ContainerAction onPress={handleAddQty}>
            <Icon name="add" size={24} color={themeGlobal.colors.secondary} />
          </ContainerAction>
        </ContainerQuantity>
        <ButtonConfirm onPress={handleCartProduct}>
          <TextButtonConfirm>{changeName}</TextButtonConfirm>
        </ButtonConfirm>
      </ContainerQuantityAndButton>
    </Container>
  );
};

export default ModalCartProductQty;
