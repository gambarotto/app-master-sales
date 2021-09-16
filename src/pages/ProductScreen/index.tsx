import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import { useCart } from '../../contexts/cart';
import { IProduct, useProduct } from '../../contexts/products';
import api from '../../services/api';
import themeGlobal from '../../styles/global';

import {
  Container,
  ContainerAnimateButtonFavorite,
  ContainerIconBack,
  ContainerInfo,
  ContainerProductImage,
  IconBack,
  ProductImage,
  ContainerNameAndPackage,
  TextNameProduct,
  TextPackage,
  ContainerQuantity,
  ContainerIconQuantity,
  TextNumberQuantity,
  TextPrice,
  IconQuantity,
  ContainerDescription,
  TitleDescription,
  TextDescription,
  ContainerActionButtons,
  ButtonFavorite,
  IconFavorite,
  ContainerNameAndPrice,
  ContainerProductPackage,
  ContainerHandleQuantity,
} from './styles';

const ProductScreen: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IProduct;
  const navigation = useNavigation();
  const { handleProduct, cartProducts } = useCart();
  const { favoriteProducts, updateFavoriteProducts } = useProduct();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(() => {
    const isFav = favoriteProducts.findIndex(
      (fav) => fav.id === routeParams.id,
    );
    return isFav >= 0;
  });
  const [currentPrice, setCurrentPrice] = useState(routeParams.sale_price);
  const queryClient = useQueryClient();
  const favoriteAdd = useMutation(
    async (product_id: string) => api.post('users/favorites', { product_id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('favorites');
      },
      onMutate: (product_id) => {
        updateFavoriteProducts(
          favoriteProducts.filter((fav) => fav.id !== product_id),
        );
      },
    },
  );
  const favoriteDelete = useMutation(
    async (product_id: string) => api.delete(`users/favorites/${product_id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('favorites');
      },
      onMutate: (product_id) => {
        updateFavoriteProducts(
          favoriteProducts.filter((fav) => fav.id !== product_id),
        );
      },
    },
  );

  useEffect(() => {
    const product = cartProducts.filter(
      (item) => item.product.id === routeParams.id,
    );
    if (product.length > 0) {
      setQuantity(product[0].quantity);
    } else {
      setQuantity(0);
    }
  }, [cartProducts, routeParams.id]);
  const handleRemoveQty = useCallback(() => {
    if (quantity > 0) {
      setQuantity((state) => state - 1);
    }
  }, [quantity]);
  const handleAddQty = useCallback(() => {
    setQuantity((state) => state + 1);
  }, []);
  const handleAddCartProduct = useCallback(() => {
    if (quantity > 0) {
      const data = { product: { ...routeParams }, quantity: Number(quantity) };

      handleProduct(data);
      navigation.navigate('Cart');
    }
  }, [handleProduct, navigation, quantity, routeParams]);

  const currentValue = useMemo((): number => {
    setCurrentPrice(routeParams.sale_price * quantity);
    const value = quantity * routeParams.sale_price;
    return value;
  }, [quantity, routeParams.sale_price]);

  const handleFavorite = useCallback(
    async (product_id: string) => {
      if (isFavorite) {
        favoriteDelete.mutate(product_id);
      } else {
        favoriteAdd.mutate(product_id);
      }
      setIsFavorite((state) => !state);
    },
    [favoriteAdd, favoriteDelete, isFavorite],
  );

  return (
    <Container>
      <ContainerProductImage
        style={{ elevation: -1 }}
        from={{ translateY: -30, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 600 }}
      >
        <ProductImage
          source={{ uri: routeParams.photos[0].photo_url }}
          resizeMode="cover"
        />
        <ContainerIconBack
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 50,
              height: 2,
            },
            shadowOpacity: 0,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <IconBack
            name="keyboard-arrow-left"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ContainerIconBack>
      </ContainerProductImage>
      <ContainerInfo
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 50,
            height: 20,
          },
          shadowOpacity: 0,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        from={{ translateY: 70, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <ContainerNameAndPackage>
          <ContainerNameAndPrice>
            <TextNameProduct>{routeParams.name}</TextNameProduct>
            <TextPrice>
              <Currency
                value={currentPrice ? currentValue : routeParams.sale_price}
              />
            </TextPrice>
          </ContainerNameAndPrice>
          <ContainerProductPackage>
            <TextPackage>{routeParams.package}</TextPackage>
          </ContainerProductPackage>
        </ContainerNameAndPackage>
        <ContainerDescription>
          <TitleDescription>Descrição</TitleDescription>
          <TextDescription>{routeParams.description}</TextDescription>
        </ContainerDescription>
        <ContainerQuantity>
          <ContainerHandleQuantity
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -62,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <ContainerIconQuantity onPress={handleRemoveQty}>
              <IconQuantity
                name="remove"
                size={24}
                color={themeGlobal.colors.gray3}
              />
            </ContainerIconQuantity>
            <TextNumberQuantity>{quantity}</TextNumberQuantity>
            <ContainerIconQuantity onPress={handleAddQty}>
              <IconQuantity
                name="add"
                size={24}
                color={themeGlobal.colors.gray3}
              />
            </ContainerIconQuantity>
          </ContainerHandleQuantity>
        </ContainerQuantity>
        <ContainerActionButtons>
          <ContainerAnimateButtonFavorite>
            <ButtonFavorite
              isFavorite={isFavorite}
              onPress={() => handleFavorite(routeParams.id)}
            >
              <IconFavorite
                name="favorite"
                size={18}
                color={
                  isFavorite ? themeGlobal.colors.white : themeGlobal.colors.red
                }
              />
            </ButtonFavorite>
          </ContainerAnimateButtonFavorite>
          <Button color="tertiary" textSize={16} onPress={handleAddCartProduct}>
            Adicionar ao carrinho
          </Button>
        </ContainerActionButtons>
      </ContainerInfo>
    </Container>
  );
};

export default ProductScreen;
