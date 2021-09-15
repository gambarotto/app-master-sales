/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { ICartProduct } from '../../contexts/cart';

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

interface Props {
  item: ICartProduct;
  handlePressCartProduct(item: ICartProduct): void;
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
        <ProductImage source={{ uri: item.product.photos[0].photo_url }} />
      </ContainerProductImage>
      <ContainerProductData>
        <NameProduct
          numberOfLines={1}
          ellipsizeMode="tail"
        >{`${item.quantity}x - ${item.product.name}`}</NameProduct>

        <TotalProduct>
          <Currency value={productValue} />
        </TotalProduct>
      </ContainerProductData>
    </Container>
  );
};

export default CartProductItem;
