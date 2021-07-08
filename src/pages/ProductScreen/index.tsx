import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../components/Button';
import themeGlobal from '../../styles/global';
import { IProductItem } from '../HomeScreen';

import {
  Container,
  ContainerIconBack,
  ContainerInfo,
  ContainerProductImage,
  IconBack,
  ProductImage,
  ContainerNameAndPackage,
  TextNameProduct,
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
  const routeParams = route.params as IProductItem;
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);

  const [currentPrice, setCurrentPrice] = useState(routeParams.sale_price);

  const handleRemoveQty = useCallback(() => {
    if (quantity > 1) {
      setQuantity((state) => state - 1);
    }
  }, [quantity]);
  const handleAddQty = useCallback(() => {
    setQuantity((state) => state + 1);
  }, []);

  const currentValue = useMemo(() => {
    setCurrentPrice(routeParams.sale_price * quantity);
    const value = quantity * routeParams.sale_price;
    return `R$ ${value.toFixed(2)}`;
  }, [quantity, routeParams.sale_price]);

  return (
    <Container>
      <ContainerProductImage>
        <ProductImage source={{ uri: routeParams.photo.photo_url }} />
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
              {currentPrice ? currentValue : routeParams.sale_price}
            </TextPrice>
          </ContainerTextPrice>
        </ContainerQuantityAndPrice>
        <ContainerDescription>
          <TitleDescription>Descrição do Produto</TitleDescription>
          <TextDescription>{routeParams.description}</TextDescription>
        </ContainerDescription>
        <ContainerActionButtons>
          <ButtonFavorite>
            <IconFavorite
              name="favorite"
              size={18}
              color={themeGlobal.colors.red}
            />
          </ButtonFavorite>
          <Button color="tertiary" textSize={16}>
            Adicionar ao carrinho
          </Button>
        </ContainerActionButtons>
      </ContainerInfo>
    </Container>
  );
};

export default ProductScreen;
