/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { IProduct, useProduct } from '../../contexts/products';

interface IPropsItem {
  item: IProduct;
  index: number;
}

const FavoriteScreen: React.FC = () => {
  const { updateProducts } = useProduct();
  const { data: favorite_products } = useFetch('favorites', 'users/favorites');

  useEffect(() => {
    updateProducts(favorite_products);
  }, [favorite_products, updateProducts]);

  const renderItem = ({ item: product, index }: IPropsItem) => (
    <ProductItem product={product} index={index} />
  );
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
          renderItem={renderItem}
        />
      </ContainerFavoriteList>
    </Container>
  );
};

export default FavoriteScreen;
