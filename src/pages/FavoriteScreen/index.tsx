import React from 'react';

import {
  Container,
  ContainerFavoriteList,
  ContainerHeader,
  FavoriteList,
  TitleFavorites,
} from './styles';
import HeaderScreen from '../../components/HeaderScreen';
import ProductItem from '../../components/ProductItem';
import { IProductItem } from '../HomeScreen';

const FavoriteScreen: React.FC = () => {
  const products: IProductItem[] = [
    {
      id: '1',
      name: 'Queijo 1',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '1',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
    {
      id: '2',
      name: 'Queijo 2',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '2',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
    {
      id: '3',
      name: 'Queijo 3',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '3',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
    {
      id: '4',
      name: 'Queijo 4',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '4',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
    {
      id: '5',
      name: 'Queijo 5',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '5',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
    {
      id: '6',
      name: 'Queijo 6',
      description:
        'Sunt quis minim culpa voluptate elit sint sunt. Reprehenderit culpa aliquip consectetur amet ad Lorem do proident. Nisi voluptate',
      sale_price: 27.9,
      photo: {
        id: '6',
        photo_url:
          'https://portaldoqueijo.com.br/site/wp-content/uploads/2019/03/Queijo-canastra.-Fonte-Armazem-S%C3%A3o-Roque-881x587-881x587.jpg',
      },
    },
  ];
  return (
    <Container>
      <ContainerHeader>
        <HeaderScreen />
      </ContainerHeader>
      <ContainerFavoriteList>
        <TitleFavorites>Favoritos</TitleFavorites>
        <FavoriteList
          data={products}
          keyExtractor={(product) => product.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: product }) => <ProductItem product={product} />}
        />
      </ContainerFavoriteList>
    </Container>
  );
};

export default FavoriteScreen;
