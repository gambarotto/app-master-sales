/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';
import CheckCircle from '../../components/CheckCircle';
import Currency from '../../components/Currency';
import ModalCartProductQty from '../../components/ModalCartProductQty';
import { ICartProduct, useCart } from '../../contexts/cart';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import themeGlobal from '../../styles/global';

import {
  ButtonAddMoreItems,
  ButtonBack,
  ButtonTrash,
  CartProductsList,
  Container,
  ContainerAddress,
  ContainerAnimateCard,
  ContainerBottom,
  ContainerBottomCard,
  ContainerButtons,
  ContainerCard,
  ContainerCartProductList,
  ContainerChangeAddress,
  ContainerDeliveryAddress,
  ContainerHeader,
  ContainerHeaderWithoutItems,
  ContainerLabelAndPrice,
  ContainerTitleDelivery,
  ContainerTopCard,
  ContainerTotal,
  ContainerWithOutItems,
  DeliveryLabel,
  DeliveryPrice,
  Icon,
  IconHeader,
  ImageLogo,
  TextAddMoreItems,
  TextAddress,
  TextAliasAddress,
  TextChangeAddress,
  TextTotal,
  TextTotalValue,
  TextWithOutItems,
  TitleDelivery,
  TitlePage,
} from './styles';
import { useFetch } from '../../hooks/useFetch';
import { IAddress } from '../../contexts/auth';

export interface ICartProductItem {
  product: ICartProduct;
  quantity: number;
}
export interface IOrder {
  products: ICartProduct[];
  deliveryFee: number;
  delivery_address: IAddress | null | undefined;
  subTotal: number;
}
interface IPropsItem {
  item: ICartProduct;
}

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 5,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 3,

  elevation: 4,
};

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cartProducts, countCartProducts, clearCart } = useCart();
  const { data: defaultAddress } = useFetch<IAddress>(
    'address_default',
    '/users/adresses/me/default',
  );
  const [isCheckedDelivery, setIsCheckedDelivery] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(defaultAddress ? 10 : 0);
  const [currentItemModal, setCurrentItemModal] = useState<ICartProductItem>(
    {} as ICartProductItem,
  );
  useEffect(() => {
    setDeliveryFee(defaultAddress ? 10 : 0);
  }, [defaultAddress]);
  const handlePressCartProduct = useCallback((item) => {
    setCurrentItemModal(item);
    setShowModal((state) => !state);
  }, []);
  const handleModal = useCallback(() => {
    setShowModal((state) => !state);
  }, []);
  const handleDeliveryMethod = useCallback((rate: number) => {
    setIsCheckedDelivery((state) => !state);
    setDeliveryFee(rate);
  }, []);
  const calcTotal = useMemo(() => {
    const totalProducts = cartProducts.reduce(
      (acc, currentProduct) =>
        acc + currentProduct.product.sale_price * currentProduct.quantity,
      0,
    );
    return totalProducts + deliveryFee;
  }, [cartProducts, deliveryFee]);
  const handleClearCart = useCallback(() => {
    clearCart();
    navigation.navigate('Tabs');
  }, [clearCart, navigation]);
  const handleGoToPayment = useCallback(() => {
    const order: IOrder = {
      products: cartProducts,
      deliveryFee,
      delivery_address: isCheckedDelivery ? defaultAddress : null,
      subTotal: calcTotal - deliveryFee,
    };
    navigation.navigate('Payment', order);
  }, [
    calcTotal,
    cartProducts,
    defaultAddress,
    deliveryFee,
    isCheckedDelivery,
    navigation,
  ]);

  const renderItem = ({ item }: IPropsItem) => (
    <CartProductItem
      key={item.product.id}
      item={item}
      handlePressCartProduct={() => handlePressCartProduct(item)}
    />
  );
  const footerComponent = (): JSX.Element => (
    <ButtonAddMoreItems onPress={() => navigation.navigate('Tabs')}>
      <TextAddMoreItems>Adicionar mais itens</TextAddMoreItems>
    </ButtonAddMoreItems>
  );
  if (countCartProducts <= 0) {
    return (
      <>
        <ContainerHeaderWithoutItems>
          <ButtonBack onPress={() => navigation.navigate('Tabs')}>
            <IconHeader
              name="keyboard-arrow-left"
              size={24}
              color={themeGlobal.colors.secondary}
            />
          </ButtonBack>
          <ImageLogo
            from={{ translateX: -30, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            source={logoImage}
          />
        </ContainerHeaderWithoutItems>
        <ContainerWithOutItems>
          <TextWithOutItems>Oops...</TextWithOutItems>
          <TextWithOutItems>
            Você ainda não tem produtos no carrinho
          </TextWithOutItems>
          <ButtonAddMoreItems onPress={() => navigation.navigate('Tabs')}>
            <TextAddMoreItems>Adicionar Produtos</TextAddMoreItems>
          </ButtonAddMoreItems>
        </ContainerWithOutItems>
      </>
    );
  }
  return (
    <Container>
      <ContainerHeader>
        <ButtonBack onPress={() => navigation.navigate('Tabs')}>
          <IconHeader
            name="keyboard-arrow-left"
            size={24}
            color={themeGlobal.colors.secondary}
          />
        </ButtonBack>
        <ImageLogo
          from={{ translateX: -30, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          source={logoImage}
        />
      </ContainerHeader>
      <TitlePage>Carrinho</TitlePage>
      <ContainerCartProductList>
        <CartProductsList
          data={cartProducts}
          keyExtractor={(product) => product.product.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={footerComponent}
        />
      </ContainerCartProductList>
      <ContainerDeliveryAddress>
        <ContainerTitleDelivery>
          <TitleDelivery>Entrega</TitleDelivery>
          <ContainerChangeAddress
            onPress={() => navigation.navigate('Adresses')}
          >
            <TextChangeAddress>Trocar endereço</TextChangeAddress>
          </ContainerChangeAddress>
        </ContainerTitleDelivery>

        {defaultAddress ? (
          <ContainerAnimateCard
            from={{ translateY: 30, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              scale: isCheckedDelivery ? [0.98, 1] : 1,
            }}
            transition={{ type: 'timing', duration: 150 }}
          >
            <ContainerCard
              isChecked={isCheckedDelivery}
              onPress={() => handleDeliveryMethod(10)}
              style={isCheckedDelivery && shadowStyle}
            >
              <ContainerTopCard>
                <CheckCircle isChecked={isCheckedDelivery} size={20} />
                <ContainerLabelAndPrice>
                  <TextAliasAddress isChecked={isCheckedDelivery}>
                    {defaultAddress.alias}
                  </TextAliasAddress>
                  <DeliveryPrice isChecked={isCheckedDelivery}>
                    <Currency value={10} />
                  </DeliveryPrice>
                </ContainerLabelAndPrice>
              </ContainerTopCard>
              <ContainerBottomCard>
                <ContainerAddress>
                  <TextAddress isChecked={isCheckedDelivery}>
                    {`${defaultAddress?.street}, ${defaultAddress?.number}`}
                  </TextAddress>
                  <TextAddress isChecked={isCheckedDelivery}>
                    {`${defaultAddress?.city} - cep: ${defaultAddress?.zip_code}`}
                  </TextAddress>
                </ContainerAddress>
              </ContainerBottomCard>
            </ContainerCard>
          </ContainerAnimateCard>
        ) : (
          <ContainerCard
            isChecked={isCheckedDelivery}
            onPress={() => navigation.navigate('Adresses')}
            style={isCheckedDelivery && shadowStyle}
          >
            <ContainerTopCard>
              <CheckCircle isChecked={isCheckedDelivery} size={20} />
              <ContainerLabelAndPrice>
                <TextAliasAddress isChecked={isCheckedDelivery}>
                  Cadastrar endereço
                </TextAliasAddress>
              </ContainerLabelAndPrice>
            </ContainerTopCard>
          </ContainerCard>
        )}
        <ContainerAnimateCard
          from={{ translateY: 30, opacity: 0 }}
          animate={{
            translateY: 0,
            opacity: 1,
            scale: !isCheckedDelivery ? [0.98, 1] : 1,
          }}
          transition={{ type: 'timing', duration: 150 }}
        >
          <ContainerCard
            isChecked={!isCheckedDelivery}
            onPress={() => handleDeliveryMethod(0)}
            style={!isCheckedDelivery && shadowStyle}
          >
            <ContainerTopCard>
              <CheckCircle isChecked={!isCheckedDelivery} size={20} />
              <ContainerLabelAndPrice>
                <DeliveryLabel isChecked={!isCheckedDelivery}>
                  Retirar na loja
                </DeliveryLabel>
                <DeliveryPrice isChecked={!isCheckedDelivery}>
                  <Currency value={0} />
                </DeliveryPrice>
              </ContainerLabelAndPrice>
            </ContainerTopCard>
          </ContainerCard>
        </ContainerAnimateCard>
      </ContainerDeliveryAddress>
      <ContainerBottom>
        <ContainerTotal>
          <TextTotal>Total</TextTotal>
          <TextTotalValue>
            <Currency value={calcTotal} />
          </TextTotalValue>
        </ContainerTotal>
        <ContainerButtons>
          <ButtonTrash onPress={handleClearCart}>
            <Icon name="delete" size={26} color={themeGlobal.colors.white} />
          </ButtonTrash>
          <Button onPress={handleGoToPayment} color="tertiary" textSize={16}>
            Finalizar pedido
          </Button>
        </ContainerButtons>
      </ContainerBottom>
      <Modal
        style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}
        isVisible={showModal}
        onBackButtonPress={handleModal}
        coverScreen
      >
        <ModalCartProductQty
          handleModal={handleModal}
          item={currentItemModal}
        />
      </Modal>
    </Container>
  );
};

export default CartScreen;
