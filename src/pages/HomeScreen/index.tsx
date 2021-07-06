import React from 'react';
// import { useAuth } from '../../contexts/auth';

import {
  CategoriesList,
  CategoryItemContainer,
  CategoryItemImage,
  CategoryItemTitle,
  Container,
  ContainerCategories,
  ContainerCategoryList,
  ContainerHeader,
  ContainerProductList,
  ContainerProducts,
  ContainerSearch,
  IconSearch,
  InputSearch,
  ProductList,
  TitleCategories,
  TitleProducts,
} from './styles';
import themeGlobal from '../../styles/global';
import ProductItem from './ProductItem';
import HeaderScreen from '../../components/HeaderScreen';

export interface ICategoryItem {
  id: string;
  name: string;
  image_url: string;
}
interface IPhotoProduct {
  id: string;
  photo_url: string;
}
export interface IProductItem {
  id: string;
  name: string;
  description: string;
  sale_price: number;
  photo: IPhotoProduct;
}

const HomeScreen: React.FC = () => {
  const categories: ICategoryItem[] = [
    {
      id: '1',
      name: 'Queijos',
      image_url:
        'https://www.atabua.com.br/wp-content/uploads/2020/09/post_thumbnail-5e561078885c6abcd39df0847ffc94a4.jpeg',
    },
    {
      id: '2',
      name: 'Doces',
      image_url:
        'https://japrovei.com/wp-content/uploads/2019/12/melhor-marca-de-doce-de-leite.jpg',
    },
    {
      id: '3',
      name: 'Bifes de Linguiça',
      image_url:
        'https://topxfoods.com/wp-content/uploads/2020/10/bife-linguica-apimentado.jpg',
    },
  ];
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
  ];
  // const { user, signOut } = useAuth();
  return (
    <Container>
      <ContainerHeader>
        <HeaderScreen />
        <ContainerSearch>
          <IconSearch
            name="search"
            size={24}
            color={themeGlobal.colors.gray2}
          />
          <InputSearch placeholder="Pesquisar" />
        </ContainerSearch>
      </ContainerHeader>
      <ContainerCategories>
        <TitleCategories>Categorias</TitleCategories>
        <ContainerCategoryList>
          <CategoriesList
            data={categories}
            keyExtractor={(category) => category.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: category }) => (
              <CategoryItemContainer>
                <CategoryItemImage source={{ uri: category.image_url }}>
                  <CategoryItemTitle>{category.name}</CategoryItemTitle>
                </CategoryItemImage>
              </CategoryItemContainer>
            )}
          />
        </ContainerCategoryList>
      </ContainerCategories>
      <ContainerProducts>
        <TitleProducts>Produtos</TitleProducts>
        <ContainerProductList>
          <ProductList
            data={products}
            keyExtractor={(product) => product.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: product }) => (
              <ProductItem product={product} />
            )}
            contentContainerStyle={{ paddingBottom: '10%' }}
          />
        </ContainerProductList>
      </ContainerProducts>
    </Container>
  );
};

export default HomeScreen;
