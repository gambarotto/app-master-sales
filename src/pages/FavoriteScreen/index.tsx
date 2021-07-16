import React, { useEffect } from 'react';

import {
  Container,
  ContainerFavoriteList,
  ContainerHeader,
  FavoriteList,
  TitleFavorites,
} from './styles';
import HeaderScreen from '../../components/HeaderScreen';
import ProductItem from '../../components/ProductItem';
import { useFetch } from '../../hooks/useFetch';
import { useProduct } from '../../contexts/products';

const FavoriteScreen: React.FC = () => {
  const { updateProducts } = useProduct();
  const { data: favorite_products } = useFetch('users/favorites');

  useEffect(() => {
    updateProducts(favorite_products);
  }, [favorite_products, updateProducts]);
  return (
    <Container>
      <ContainerHeader>
        <HeaderScreen />
      </ContainerHeader>
      <ContainerFavoriteList>
        <TitleFavorites>Favoritos</TitleFavorites>
        <FavoriteList
          data={favorite_products}
          keyExtractor={(product) => product.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: product }) => <ProductItem product={product} />}
        />
      </ContainerFavoriteList>
    </Container>
  );
};

export default FavoriteScreen;
