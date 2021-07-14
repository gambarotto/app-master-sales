/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';

import Currency from '../Currency';

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
  const [value, setValue] = useState(item.quantity * item.product.sale_price);

  const productValue = useMemo(
    () => item.quantity * item.product.sale_price,
    [item.product.sale_price, item.quantity],
  );

  return (
    <Container onPress={() => handlePressCartProduct(item)}>
      <ContainerProductImage>
        <ProductImage source={{ uri: item.product.photo.photo_url }} />
      </ContainerProductImage>
      <ContainerProductData>
        <NameProduct>{item.product.name}</NameProduct>
        <ContainerQuantity>
          <TextQuantity>{item.quantity}</TextQuantity>
        </ContainerQuantity>
        <TotalProduct>
          <Currency value={productValue} />
        </TotalProduct>
      </ContainerProductData>
    </Container>
  );
};

export default CartProductItem;
