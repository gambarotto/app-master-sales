import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import { useCart } from '../../contexts/cart';
import { IProduct, useProduct } from '../../contexts/products';
import api from '../../services/api';
import themeGlobal from '../../styles/global';

import {
  Container,
  ContainerIconBack,
  ContainerInfo,
  ContainerProductImage,
  IconBack,
  ProductImage,
  ContainerNameAndPackage,
  TextNameProduct,
  TextPackage,
  ContainerQuantityAndPrice,
  ContainerQuantity,
  ContainerIconQuantity,
  TextNumberQuantity,
  ContainerTextPrice,
  TextPrice,
  IconQuantity,
  ContainerDescription,
  TitleDescription,
  TextDescription,
  ContainerActionButtons,
  ButtonFavorite,
  IconFavorite,
} from './styles';

const ProductScreen: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IProduct;
  const navigation = useNavigation();
  const { handleProduct, cartProducts } = useCart();
  const { favoriteProducts } = useProduct();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(() => {
    const isFav = favoriteProducts.findIndex(
      (fav) => fav.id === routeParams.id,
    );
    return isFav >= 0;
  });

  const [currentPrice, setCurrentPrice] = useState(routeParams.sale_price);

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
    if (quantity > 1) {
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
        await api.delete(`users/favorites/${routeParams.id}`);
      } else {
        await api.post('users/favorites', { product_id });
      }
      setIsFavorite((state) => !state);
    },
    [isFavorite, routeParams.id],
  );

  return (
    <Container>
      <ContainerProductImage>
        <ProductImage source={{ uri: routeParams.photos[0].photo_url }} />
        <ContainerIconBack onPress={() => navigation.goBack()}>
          <IconBack
            name="keyboard-arrow-left"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ContainerIconBack>
      </ContainerProductImage>
      <ContainerInfo>
        <ContainerNameAndPackage>
          <TextNameProduct>{routeParams.name}</TextNameProduct>
          <TextPackage>{routeParams.package}</TextPackage>
        </ContainerNameAndPackage>
        <ContainerQuantityAndPrice>
          <ContainerQuantity>
            <ContainerIconQuantity onPress={handleRemoveQty}>
              <IconQuantity
                name="remove"
                size={24}
                color={themeGlobal.colors.gray1}
              />
            </ContainerIconQuantity>
            <TextNumberQuantity>{quantity}</TextNumberQuantity>
            <ContainerIconQuantity onPress={handleAddQty}>
              <IconQuantity
                name="add"
                size={24}
                color={themeGlobal.colors.gray1}
              />
            </ContainerIconQuantity>
          </ContainerQuantity>
          <ContainerTextPrice>
            <TextPrice>
              <Currency
                value={currentPrice ? currentValue : routeParams.sale_price}
              />
            </TextPrice>
          </ContainerTextPrice>
        </ContainerQuantityAndPrice>
        <ContainerDescription>
          <TitleDescription>Descrição do Produto</TitleDescription>
          <TextDescription>{routeParams.description}</TextDescription>
        </ContainerDescription>
        <ContainerActionButtons>
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
          <Button color="tertiary" textSize={16} onPress={handleAddCartProduct}>
            Adicionar ao carrinho
          </Button>
        </ContainerActionButtons>
      </ContainerInfo>
    </Container>
  );
};

export default ProductScreen;
