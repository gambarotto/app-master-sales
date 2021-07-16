import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import ProductItem from '../../components/ProductItem';
import HeaderScreen from '../../components/HeaderScreen';
import { useFetch } from '../../hooks/useFetch';
import { IProduct, useProduct } from '../../contexts/products';

export interface ICategoryItem {
  id: string;
  name: string;
  image_url: string;
}

const HomeScreen: React.FC = () => {
  const categories: ICategoryItem[] = [
    {
      id: '757d8707-8372-4449-b937-ae39a2a063db',
      name: 'Queijos',
      image_url:
        'https://www.atabua.com.br/wp-content/uploads/2020/09/post_thumbnail-5e561078885c6abcd39df0847ffc94a4.jpeg',
    },
    {
      id: 'dd5a54a5-6f37-4699-b393-3437bf9ffd89',
      name: 'Doces',
      image_url:
        'https://japrovei.com/wp-content/uploads/2019/12/melhor-marca-de-doce-de-leite.jpg',
    },
    {
      id: '198d3291-7d0f-4f43-8045-1746bb745a78',
      name: 'Bifes de Linguiça',
      image_url:
        'https://topxfoods.com/wp-content/uploads/2020/10/bife-linguica-apimentado.jpg',
    },
    {
      id: 'f9c0aa26-3860-4509-a935-50bff89af6bf',
      name: 'Artesanal',
      image_url:
        'https://i9menu.com.br/public/uploads/2019/01/culinaria-artesanal.jpg',
    },
  ];
  const { updateProducts } = useProduct();
  const { data: products } = useFetch<IProduct[]>('products');
  const [productsFiltred, setProductsFiltered] = useState<IProduct[]>([]);

  useEffect(() => {
    updateProducts(products as IProduct[]);
  }, [products, updateProducts]);

  const handleSelectCategory = useCallback(
    (category_id: string) => {
      if (products) {
        const prodsFiltred = products.filter((product) => {
          const findIndex = product.categories.findIndex(
            (category) => category.id === category_id,
          );
          return findIndex >= 0 && product;
        });
        setProductsFiltered(prodsFiltred);
      }
    },
    [products],
  );
  const dataProducts = useMemo(
    () => (productsFiltred.length > 0 ? productsFiltred : products),
    [products, productsFiltred],
  );

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
              <CategoryItemContainer
                onPress={() => handleSelectCategory(category.id)}
              >
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
            data={dataProducts}
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
