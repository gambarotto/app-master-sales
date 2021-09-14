import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useAuth } from '../../contexts/auth';

import { useAnimationState } from 'moti';
import {
  CategoriesList,
  CategoryItemContainer,
  CategoryItemImage,
  CategoryItemTitle,
  Container,
  ContainerAnimatedItemCategory,
  ContainerAnimateIconClear,
  ContainerCategories,
  ContainerCategoryList,
  ContainerHeader,
  ContainerIconClear,
  ContainerProductList,
  ContainerProducts,
  ContainerTitleAndClearCategories,
  Icon,
  ProductList,
  TextIcon,
  TitleCategories,
  TitleProducts,
} from './styles';
import ProductItem from '../../components/ProductItem';
import HeaderScreen from '../../components/HeaderScreen';
import themeGlobal from '../../styles/global';
import { useFetch } from '../../hooks/useFetch';
import { IProduct, useProduct } from '../../contexts/products';
import LoadingContent from '../../components/LoadingContent';

export interface ICategoryItem {
  id: string;
  name: string;
  image_url: string;
}

const HomeScreen: React.FC = () => {
  const { updateProducts, updateFavoriteProducts } = useProduct();
  const { data: products } = useFetch<IProduct[]>('products', 'products');
  const { data: categories } = useFetch<ICategoryItem[]>(
    'categories',
    `categories`,
  );
  const { data: favorite_products } = useFetch<IProduct[]>(
    'favorites',
    'users/favorites',
  );
  const [productsFiltred, setProductsFiltered] = useState<IProduct[]>([]);

  useEffect(() => {
    updateProducts(products as IProduct[]);
    updateFavoriteProducts(favorite_products as IProduct[]);
  }, [favorite_products, products, updateFavoriteProducts, updateProducts]);

  const animationClearCategories = useAnimationState({
    extend: {
      width: 100,
      opacity: 1,
    },
    close: {
      width: 0,
      opacity: 0,
    },
  });
  const handleSelectCategory = useCallback(
    (category_id: string) => {
      if (products) {
        const prodsFiltred = products.filter((product) => {
          const findIndex = product.categories.findIndex(
            (category) => category.id === category_id,
          );
          return findIndex >= 0 && product;
        });
        animationClearCategories.transitionTo('extend');
        setProductsFiltered(prodsFiltred);
      }
    },
    [animationClearCategories, products],
  );
  const handleClearCategories = useCallback(() => {
    animationClearCategories.transitionTo('close');
    setProductsFiltered(products as IProduct[]);
  }, [animationClearCategories, products]);
  const dataProducts = useMemo(
    () => (productsFiltred.length > 0 ? productsFiltred : products),
    [products, productsFiltred],
  );

  if (!products) {
    return <LoadingContent showIndicator={false} textLoading="Carregando..." />;
  }
  return (
    <Container>
      <ContainerHeader>
        <HeaderScreen />
      </ContainerHeader>
      <ContainerCategories>
        <ContainerTitleAndClearCategories>
          <TitleCategories
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            Categorias
          </TitleCategories>
          <ContainerAnimateIconClear state={animationClearCategories}>
            <ContainerIconClear onPress={handleClearCategories}>
              <Icon
                name="clear-all"
                size={20}
                color={themeGlobal.colors.gray1}
              />
              <TextIcon>Limpar filtro</TextIcon>
            </ContainerIconClear>
          </ContainerAnimateIconClear>
        </ContainerTitleAndClearCategories>
        <ContainerCategoryList>
          <CategoriesList
            data={categories}
            keyExtractor={(category) => category.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: category, index }) => (
              <ContainerAnimatedItemCategory
                from={{ translateY: -30, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 500 + index * 100 }}
              >
                <CategoryItemContainer
                  onPress={() => handleSelectCategory(category.id)}
                >
                  <CategoryItemImage source={{ uri: category.image_url }}>
                    <CategoryItemTitle>{category.name}</CategoryItemTitle>
                  </CategoryItemImage>
                </CategoryItemContainer>
              </ContainerAnimatedItemCategory>
            )}
          />
        </ContainerCategoryList>
      </ContainerCategories>
      <ContainerProducts>
        <TitleProducts
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          Produtos
        </TitleProducts>
        <ContainerProductList>
          <ProductList
            data={dataProducts}
            keyExtractor={(product) => product.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: product, index }) => (
              <ProductItem product={product} index={index} />
            )}
            contentContainerStyle={{ paddingBottom: '10%' }}
          />
        </ContainerProductList>
      </ContainerProducts>
    </Container>
  );
};

export default HomeScreen;
