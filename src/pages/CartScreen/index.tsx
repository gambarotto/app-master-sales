import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
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
  ContainerBottom,
  ContainerBottomCard,
  ContainerButtons,
  ContainerCard,
  ContainerCartProductList,
  ContainerDeliveryAddress,
  ContainerHeader,
  ContainerHeaderWithoutItems,
  ContainerLabelAndPrice,
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

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cartProducts, countCartProducts, clearCart } = useCart();
  const { data: defaultAddress } = useFetch<IAddress>(
    '/users/adresses/me/default',
  );
  const [isCheckedDelivery, setIsCheckedDelivery] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(defaultAddress ? 10 : 0);
  const [currentItemModal, setCurrentItemModal] = useState<ICartProductItem>(
    {} as ICartProductItem,
  );

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
      delivery_address: deliveryFee === 0 ? null : defaultAddress,
      subTotal: calcTotal - deliveryFee,
    };
    navigation.navigate('Payment', order);
  }, [calcTotal, cartProducts, defaultAddress, deliveryFee, navigation]);
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
          <ImageLogo source={logoImage} />
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
        <ImageLogo source={logoImage} />
      </ContainerHeader>
      <TitlePage>Carrinho</TitlePage>
      <ContainerCartProductList>
        <CartProductsList
          data={cartProducts}
          keyExtractor={(product) => product.product.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartProductItem
              key={item.product.id}
              item={item}
              handlePressCartProduct={() => handlePressCartProduct(item)}
            />
          )}
        />
        <ButtonAddMoreItems onPress={() => navigation.navigate('Tabs')}>
          <TextAddMoreItems>Adicionar mais itens</TextAddMoreItems>
        </ButtonAddMoreItems>
      </ContainerCartProductList>
      <ContainerDeliveryAddress>
        <TitleDelivery>Entrega</TitleDelivery>
        {defaultAddress ? (
          <ContainerCard
            isChecked={isCheckedDelivery}
            onPress={() => handleDeliveryMethod(10)}
          >
            <ContainerTopCard>
              <CheckCircle isChecked={isCheckedDelivery} size={20} />
              <ContainerLabelAndPrice>
                <TextAliasAddress isChecked={isCheckedDelivery}>
                  Casa
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
        ) : (
          <ContainerCard
            isChecked={isCheckedDelivery}
            onPress={() => navigation.navigate('Adresses')}
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
        <ContainerCard
          isChecked={!isCheckedDelivery}
          onPress={() => handleDeliveryMethod(0)}
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
