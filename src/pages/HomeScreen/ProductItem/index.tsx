import React from 'react';
import { IProductItem } from '..';

import {
  Container,
  ContainerImage,
  ContainerInfo,
  DescriptionProduct,
  ImageProduct,
  PriceProduct,
  TitleProduct,
} from './styles';

interface IProductItemProps {
  product: IProductItem;
}
const ProductItem: React.FC<IProductItemProps> = ({ product }) => (
  <Container>
    <ContainerImage>
      <ImageProduct source={{ uri: product.photo.photo_url }} />
    </ContainerImage>
    <ContainerInfo>
      <TitleProduct>{product.name}</TitleProduct>
      <DescriptionProduct>{product.description}</DescriptionProduct>
      <PriceProduct>{product.sale_price}</PriceProduct>
    </ContainerInfo>
  </Container>
);

export default ProductItem;
