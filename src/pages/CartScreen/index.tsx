import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';
import CheckCircle from '../../components/CheckCircle';
import Currency from '../../components/Currency';
import ModalCartProductQty from '../../components/ModalCartProductQty';
import { useCart } from '../../contexts/cart';
import themeGlobal from '../../styles/global';

import {
  ButtonAddMoreItems,
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
  ContainerLabelAndPrice,
  ContainerTopCard,
  ContainerTotal,
  ContainerWithOutItems,
  DeliveryLabel,
  DeliveryPrice,
  Icon,
  TextAddMoreItems,
  TextAddress,
  TextAliasAddress,
  TextTotal,
  TextTotalValue,
  TextWithOutItems,
  TitleDelivery,
  TitlePage,
} from './styles';

export interface ICartProductItem {
  product: {
    id: string;
    name: string;
    description: string;
    sale_price: number;
    photo: {
      id: string;
      photo_url: string;
    };
  };
  quantity: number;
}

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cartProducts, countCartProducts, clearCart } = useCart();
  const [isCheckedDelivery, setIsCheckedDelivery] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(10);
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

  if (countCartProducts <= 0) {
    return (
      <ContainerWithOutItems>
        <TextWithOutItems>Oops...</TextWithOutItems>
        <TextWithOutItems>
          Você ainda não tem produtos no carrinho
        </TextWithOutItems>
        <ButtonAddMoreItems onPress={() => navigation.goBack()}>
          <TextAddMoreItems>Adicionar Produtos</TextAddMoreItems>
        </ButtonAddMoreItems>
      </ContainerWithOutItems>
    );
  }
  return (
    <Container>
      <TitlePage>Carrinho</TitlePage>
      <ContainerCartProductList>
        <CartProductsList
          data={cartProducts}
          keyExtractor={(product) => product.product.id}
          renderItem={({ item }) => (
            <CartProductItem
              key={item.product.id}
              item={item}
              handlePressCartProduct={() => handlePressCartProduct(item)}
            />
          )}
        />
        <ButtonAddMoreItems onPress={() => navigation.goBack()}>
          <TextAddMoreItems>Adicionar mais itens</TextAddMoreItems>
        </ButtonAddMoreItems>
      </ContainerCartProductList>
      <ContainerDeliveryAddress>
        <TitleDelivery>Entrega</TitleDelivery>
        <ContainerCard
          isChecked={isCheckedDelivery}
          onPress={() => handleDeliveryMethod(10)}
        >
          <ContainerTopCard>
            <CheckCircle isChecked={isCheckedDelivery} size={24} />
            <ContainerLabelAndPrice>
              <DeliveryLabel isChecked={isCheckedDelivery}>
                Delivery
              </DeliveryLabel>
              <DeliveryPrice isChecked={isCheckedDelivery}>
                <Currency value={10} />
              </DeliveryPrice>
            </ContainerLabelAndPrice>
          </ContainerTopCard>
          <ContainerBottomCard>
            <TextAliasAddress isChecked={isCheckedDelivery}>
              Casa
            </TextAliasAddress>
            <ContainerAddress>
              <TextAddress isChecked={isCheckedDelivery}>
                Rua Ernesto Ribeiro, 683 - cep: 12.387-908
              </TextAddress>
            </ContainerAddress>
          </ContainerBottomCard>
        </ContainerCard>
        <ContainerCard
          isChecked={!isCheckedDelivery}
          onPress={() => handleDeliveryMethod(0)}
        >
          <ContainerTopCard>
            <CheckCircle isChecked={!isCheckedDelivery} size={24} />
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
          <Button color="tertiary" textSize={16}>
            Ir para pagamento
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
