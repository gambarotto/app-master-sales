import React from 'react';
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
} from './styles';

interface Props {
  handleModal(): void;
  item: {
    product: {
      id: string;
      name: string;
      description: string;
      sale_price: number;
      photo: {
        id: string;
        photo_url: string;
      };
    };
    quantity: number;
  };
}

const ModalCartProductQty: React.FC<Props> = ({ handleModal, item }) => (
  <Container>
    <TitleModal>{item.product.name}</TitleModal>
    <ContainerQuantityAndButton>
      <ContainerQuantity>
        <ContainerAction>
          <Icon name="remove" size={24} color={themeGlobal.colors.secondary} />
        </ContainerAction>
        <Quantity>{item.quantity}</Quantity>
        <ContainerAction>
          <Icon name="add" size={24} color={themeGlobal.colors.secondary} />
        </ContainerAction>
      </ContainerQuantity>
      <ButtonConfirm onPress={handleModal}>
        <TextButtonConfirm>Confirmar</TextButtonConfirm>
      </ButtonConfirm>
    </ContainerQuantityAndButton>
  </Container>
);

export default ModalCartProductQty;
