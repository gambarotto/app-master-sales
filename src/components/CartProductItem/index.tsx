/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import Currency from '../Currency';
import ModalCartProductQty from '../ModalCartProductQty';

import {
  Container,
  ContainerProductImage,
  ProductImage,
  ContainerProductData,
  NameProduct,
  ContainerQuantity,
  TextQuantity,
  TotalProduct,
} from './styles';

interface Iitem {
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
}
interface Props {
  item: Iitem;
  handlePressCartProduct(item: Iitem): void;
}

const CartProductItem: React.FC<Props> = ({ item, handlePressCartProduct }) => {
  const [qty, setQty] = useState(item.quantity);

  const handleChangeValue = useCallback(() => {}, []);

  return (
    <Container
      key={item.product.id}
      onPress={() => handlePressCartProduct(item)}
    >
      <ContainerProductImage>
        <ProductImage source={{ uri: item.product.photo.photo_url }} />
      </ContainerProductImage>
      <ContainerProductData>
        <NameProduct>{item.product.name}</NameProduct>
        <ContainerQuantity>
          <TextQuantity>{qty}</TextQuantity>
        </ContainerQuantity>
        <TotalProduct>
          <Currency value={item.product.sale_price} />
        </TotalProduct>
      </ContainerProductData>
    </Container>
  );
};

export default CartProductItem;
