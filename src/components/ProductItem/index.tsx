import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { IProduct } from '../../contexts/products';
import Currency from '../Currency';

import {
  Container,
  ContainerAnimated,
  ContainerImage,
  ContainerInfo,
  DescriptionProduct,
  ImageProduct,
  PriceProduct,
  TitleProduct,
} from './styles';

interface IProductItemProps {
  product: IProduct;
  index: number;
}
const ProductItem: React.FC<IProductItemProps> = ({ product, index }) => {
  const navigation = useNavigation();
  const handleGoToProductScreen = useCallback(() => {
    navigation.navigate('Product', product);
  }, [navigation, product]);

  return (
    <ContainerAnimated
      from={{ translateX: -70, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 500 + index * 100 }}
    >
      <Container onPress={handleGoToProductScreen}>
        <ContainerImage>
          <ImageProduct source={{ uri: product.photos[0].photo_url }} />
        </ContainerImage>
        <ContainerInfo>
          <TitleProduct>{product.name}</TitleProduct>
          <DescriptionProduct>{product.description}</DescriptionProduct>
          <PriceProduct>
            <Currency value={product.sale_price} />
          </PriceProduct>
        </ContainerInfo>
      </Container>
    </ContainerAnimated>
  );
};

export default ProductItem;
