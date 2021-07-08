import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { IProductItem } from '../../pages/HomeScreen';
import Currency from '../Currency';

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
const ProductItem: React.FC<IProductItemProps> = ({ product }) => {
  const navigation = useNavigation();
  const handleGoToProductScreen = useCallback(() => {
    navigation.navigate('Product', product);
  }, [navigation, product]);
  return (
    <Container onPress={handleGoToProductScreen}>
      <ContainerImage>
        <ImageProduct source={{ uri: product.photo.photo_url }} />
      </ContainerImage>
      <ContainerInfo>
        <TitleProduct>{product.name}</TitleProduct>
        <DescriptionProduct>{product.description}</DescriptionProduct>
        <PriceProduct>
          <Currency value={product.sale_price} />
        </PriceProduct>
      </ContainerInfo>
    </Container>
  );
};

export default ProductItem;
