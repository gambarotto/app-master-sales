import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import CartProductItem from '../../components/CartProductItem';
import ModalCartProductQty from '../../components/ModalCartProductQty';
import { useCart } from '../../contexts/cart';

import {
  ButtonAddMoreItems,
  CartProductsList,
  Container,
  ContainerCartProductList,
  ContainerDeliveryAddress,
  ContainerWithOutItems,
  TextAddMoreItems,
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
  const { cartProducts, countCartProducts } = useCart();
  // const [products, setProducts] = useState<ICartProductItem[]>(cartProducts);
  const [showModal, setShowModal] = useState(false);
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
      </ContainerDeliveryAddress>
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
