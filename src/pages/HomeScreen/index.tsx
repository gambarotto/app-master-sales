/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useAuth } from '../../contexts/auth';

import { AnimatePresence, useAnimationState } from 'moti';
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
interface IPropsItem {
  item: IProduct;
  index: number;
}

const HomeScreen: React.FC = () => {
  const { updateProducts, updateFavoriteProducts } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState<ICategoryItem>();
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
  const animationTextClearCategories = useAnimationState({
    extend: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  });
  const handleSelectCategory = useCallback(
    (choosedCategory: ICategoryItem) => {
      if (products) {
        const prodsFiltred = products.filter((product) => {
          const findIndex = product.categories.findIndex(
            (category) => category.id === choosedCategory.id,
          );
          return findIndex >= 0 && product;
        });
        animationClearCategories.transitionTo('extend');
        animationTextClearCategories.transitionTo('extend');
        setProductsFiltered(prodsFiltred);
        setSelectedCategory(choosedCategory);
      }
    },
    [animationClearCategories, animationTextClearCategories, products],
  );
  const handleClearCategories = useCallback(() => {
    animationClearCategories.transitionTo('close');
    animationTextClearCategories.transitionTo('close');

    setProductsFiltered(products as IProduct[]);
    setSelectedCategory({} as ICategoryItem);
  }, [animationClearCategories, animationTextClearCategories, products]);
  const dataProducts = useMemo(
    () => (productsFiltred.length > 0 ? productsFiltred : products),
    [products, productsFiltred],
  );
  const renderItem = ({ item: product, index }: IPropsItem) => (
    <ProductItem product={product} index={index} />
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
              {selectedCategory && (
                <TextIcon
                  state={animationTextClearCategories}
                  transition={{ type: 'timing', duration: 700 }}
                >
                  Limpar filtro
                </TextIcon>
              )}
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
              <AnimatePresence>
                <ContainerAnimatedItemCategory
                  from={{ translateY: -30, opacity: 0 }}
                  animate={{
                    translateY: 0,
                    opacity: 1,
                    borderWidth: selectedCategory?.id === category.id ? 2 : 0,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 500 + index * 100,
                    borderWidth: {
                      type: 'timing',
                      duration: 200,
                    },
                  }}
                  exit={{
                    borderWidth: 0,
                  }}
                >
                  <CategoryItemContainer
                    onPress={() => handleSelectCategory(category)}
                  >
                    <CategoryItemImage source={{ uri: category.image_url }}>
                      <CategoryItemTitle>{category.name}</CategoryItemTitle>
                    </CategoryItemImage>
                  </CategoryItemContainer>
                </ContainerAnimatedItemCategory>
              </AnimatePresence>
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
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: '10%' }}
          />
        </ContainerProductList>
      </ContainerProducts>
    </Container>
  );
};

export default HomeScreen;
