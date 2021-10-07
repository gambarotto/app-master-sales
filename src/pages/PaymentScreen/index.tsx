/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, BackHandler } from 'react-native';
import { MotiView } from 'moti';
import { useMutation, useQueryClient } from 'react-query';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import IconBack from '../../components/IconBack';
import { IOrder } from '../CartScreen';

import {
  BrandCreditCard,
  Container,
  ContainerAddress,
  ContainerAddressData,
  ContainerButton,
  ContainerButtonCalendar,
  ContainerCardPayment,
  ContainerDateDelivery,
  ContainerDescriptionOrderCosts,
  ContainerHeader,
  ContainerOrderDetails,
  ContainerPayment,
  ContainerPaymentsMethods,
  ContainerSelectedCard,
  ContainerSubTitle,
  ContainerTitleAndPaymentsMethods,
  HolderName,
  IconCalendar,
  ImageLogo,
  NumberCard,
  SubTitle,
  TextAddress,
  TextCardPayment,
  TextDateDelivery,
  TextDescriptionItemOrder,
  TextTotalOrder,
  Title,
  TitleAliasAddress,
} from './styles';
import PaymentModal from './PaymentModal';
import { brands } from '../../utils/brands';
import { createCardHash } from '../../utils/cardHashGenerator';
import api from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { useCart } from '../../contexts/cart';
import PaymentModalError from './PaymentModalError';
import PaymentModalDelivery, { ISelectedDay } from './PaymentModalDelivery';
import themeGlobal from '../../styles/global';

export interface ICreditCard {
  id: string;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  expiration_date: string;
}
export interface INewCard {
  card_number: string;
  card_holder_name: string;
  card_expiration_date: string;
  card_cvv: string;
}
export interface IOrderRequest {
  amount: number;
  card_hash: string;
  card_id: string;
  delivery_fee: number;
  delivery: boolean;
  billing_address_id: string;
  shipping_address_id: string;
  items: {
    product: {
      id: string;
      name: string;
      description: string;
      sale_price: number;
    };
    quantity: number;
  }[];
}
export interface IAvailableDay {
  date: Date;
  dateString: string;
  available: boolean;
  reason: string;
}

const PaymentScreen: React.FC = () => {
  const { clearCart } = useCart();
  const [modalCard, setModalCard] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalDateDelivery, setModalDateDelivery] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState({} as INewCard);
  const [creditCardPayment, setCreditCardPayment] = useState({} as ICreditCard);
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params as IOrder;

  const { data: cards } = useFetch<ICreditCard[]>(
    'payment-cards',
    'payment-cards',
  );
  const { data: availableDays } = useFetch<IAvailableDay[]>(
    `available-days-${new Date()}`,
    `users/delivery/available-days/${order.delivery_address?.id}`,
  );
  const [dateDelivery, setDateDelivery] = useState<ISelectedDay>();
  const [initialDateDelivery, setInitialDateDelivery] = useState<
    string | undefined
  >();

  useEffect(() => {
    const dayAvailable = availableDays?.find((day) => day.available === true);
    if (dayAvailable) {
      const formatted = dayAvailable.dateString.split('-').reverse().join('/');

      setInitialDateDelivery(formatted);
    }
  }, [availableDays]);

  const textDateDelivery = useMemo(() => {
    if (dateDelivery && dateDelivery.dateString) {
      return dateDelivery.dateString.split('-').reverse().join('/');
    }
    return initialDateDelivery;
  }, [dateDelivery, initialDateDelivery]);

  const queryClient = useQueryClient();
  const postOrder = async (orderData: IOrderRequest) =>
    api.post('orders', orderData);

  const orderMutation = useMutation(
    (orderData: IOrderRequest) => postOrder(orderData),
    {
      onError: async () => {
        setModalError(true);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries('orders');
        clearCart();
        if (response?.data) {
          navigation.navigate('ConfirmedOrder', response?.data);
        }
      },
    },
  );
  const handleHardwareBackPress = useCallback(() => {
    setModalCard(false);
    setModalError(false);
    setModalDateDelivery(false);
    return !!modalCard;
  }, [modalCard]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleHardwareBackPress,
      );
    };
  }, [handleHardwareBackPress]);

  const handlePaymentMethod = useCallback(() => {
    setModalCard(true);
  }, []);

  const textAddressFormat = useMemo((): string | undefined => {
    if (order.delivery_address) {
      const { street, number, district } = order.delivery_address;
      const text = `${street}, ${number} - ${district}`;
      return text;
    }
    return undefined;
  }, [order.delivery_address]);

  const verifyIfHaveCreditCardSelected = useMemo(
    () => !!(creditCardPayment.id || newCreditCard.card_number),
    [creditCardPayment.id, newCreditCard.card_number],
  );
  const showCreditCardSelected = useMemo(() => {
    const selectBrand = brands[creditCardPayment.brand];

    return {
      id: creditCardPayment.id || '',
      last_digits: creditCardPayment.last_digits || newCreditCard.card_number,
      holder_name:
        creditCardPayment.holder_name || newCreditCard.card_holder_name,
      brand: selectBrand,
    };
  }, [
    creditCardPayment.brand,
    creditCardPayment.holder_name,
    creditCardPayment.id,
    creditCardPayment.last_digits,
    newCreditCard.card_holder_name,
    newCreditCard.card_number,
  ]);

  const handleConfirm = useCallback(async () => {
    if (!creditCardPayment.id && !newCreditCard.card_number) {
      setModalCard(true);
      return;
    }
    let card_hash = '';
    if (!creditCardPayment.id) {
      card_hash = await createCardHash(newCreditCard);
    }

    const items = order.products.map((product) => ({
      product: {
        id: product.product.id,
        name: product.product.name,
        description: product.product.description,
        sale_price: product.product.sale_price,
      },
      quantity: product.quantity,
    }));

    const data: IOrderRequest = {
      amount: order.subTotal || 0,
      card_hash,
      card_id: creditCardPayment.id || '',
      delivery_fee: order.deliveryFee,
      delivery: order.deliveryFee > 0,
      billing_address_id: order.delivery_address?.id || '',
      shipping_address_id: order.delivery_address?.id || '',
      items,
    };
    try {
      orderMutation.mutate(data, {
        onError: (err) => {
          console.log('mutate error', err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [
    creditCardPayment.id,
    newCreditCard,
    order.deliveryFee,
    order.delivery_address?.id,
    order.products,
    order.subTotal,
    orderMutation,
  ]);

  const textButtomConfirm = useMemo(() => {
    if (!creditCardPayment.id && !newCreditCard.card_number) {
      return 'Escolha uma forma de pagamento';
    }
    return orderMutation.isLoading ? 'Enviando pedido...' : 'Finalizar compra';
  }, [
    creditCardPayment.id,
    newCreditCard.card_number,
    orderMutation.isLoading,
  ]);

  const handleConfirmModalDeliveryDate = useCallback((data: ISelectedDay) => {
    setDateDelivery(data);
    setModalDateDelivery(false);
  }, []);
  return (
    <Container>
      <ContainerHeader>
        <IconBack onPress={() => navigation.goBack()} />
        <MotiView
          from={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 500,
            opacity: {
              type: 'timing',
              duration: 1500,
            },
          }}
        >
          <ImageLogo source={logoImage} />
        </MotiView>
      </ContainerHeader>
      <ContainerOrderDetails>
        <Title>Finalizando o Pedido</Title>
        <ContainerDescriptionOrderCosts>
          <TextDescriptionItemOrder>Produtos</TextDescriptionItemOrder>
          <TextDescriptionItemOrder>
            <Currency value={order.subTotal} />
          </TextDescriptionItemOrder>
        </ContainerDescriptionOrderCosts>
        <ContainerDescriptionOrderCosts>
          <TextDescriptionItemOrder>Taxa de entrega</TextDescriptionItemOrder>
          <TextDescriptionItemOrder>
            <Currency value={order.deliveryFee} />
          </TextDescriptionItemOrder>
        </ContainerDescriptionOrderCosts>
        <ContainerDescriptionOrderCosts>
          <TextTotalOrder>Total do pedido</TextTotalOrder>
          <TextTotalOrder>
            <Currency value={order.subTotal + order.deliveryFee} />
          </TextTotalOrder>
        </ContainerDescriptionOrderCosts>
      </ContainerOrderDetails>

      <ContainerSubTitle>
        <SubTitle>Entrega</SubTitle>
        <ContainerDateDelivery>
          {dateDelivery || initialDateDelivery ? (
            <TextDateDelivery>{`programada para ${textDateDelivery}`}</TextDateDelivery>
          ) : null}
          <ContainerButtonCalendar
            onPress={() => setModalDateDelivery(true)}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 20,
                height: 20,
              },
              shadowOpacity: 0,
              shadowRadius: 3.84,

              elevation: 2,
            }}
          >
            <IconCalendar
              name="calendar-multiselect"
              color={themeGlobal.colors.gray2}
              size={20}
            />
          </ContainerButtonCalendar>
        </ContainerDateDelivery>
      </ContainerSubTitle>
      <ContainerAddress>
        <ContainerAddressData>
          <TitleAliasAddress>
            {order.delivery_address?.alias || 'Retirar na Loja'}
          </TitleAliasAddress>
          {order.delivery_address && (
            <TextAddress>{textAddressFormat}</TextAddress>
          )}
        </ContainerAddressData>
      </ContainerAddress>
      <ContainerPayment>
        <ContainerTitleAndPaymentsMethods>
          <ContainerSubTitle>
            <SubTitle>Pagamento</SubTitle>
          </ContainerSubTitle>
          <ContainerPaymentsMethods>
            <ContainerCardPayment onPress={handlePaymentMethod}>
              <TextCardPayment>
                {verifyIfHaveCreditCardSelected
                  ? 'Trocar cartão'
                  : 'Selecione o cartão de crédito'}
              </TextCardPayment>
            </ContainerCardPayment>
          </ContainerPaymentsMethods>
          {verifyIfHaveCreditCardSelected && (
            <ContainerSelectedCard>
              <BrandCreditCard source={showCreditCardSelected.brand} />
              <NumberCard>{`**** ${showCreditCardSelected.last_digits}`}</NumberCard>
              <HolderName>{showCreditCardSelected.holder_name}</HolderName>
            </ContainerSelectedCard>
          )}
        </ContainerTitleAndPaymentsMethods>
        <ContainerButton>
          <Button
            color="secondary"
            textSize={16}
            onPress={handleConfirm}
            enabled={!orderMutation.isLoading}
          >
            {textButtomConfirm}
          </Button>
        </ContainerButton>
      </ContainerPayment>
      <Modal
        visible={modalDateDelivery}
        onRequestClose={handleHardwareBackPress}
        transparent
        statusBarTranslucent
      >
        <PaymentModalDelivery
          availableDays={availableDays}
          handleConfirm={handleConfirmModalDeliveryDate}
        />
      </Modal>
      <Modal
        visible={modalCard}
        onRequestClose={handleHardwareBackPress}
        transparent
        statusBarTranslucent
      >
        <PaymentModal
          cards={cards}
          setIsVisible={setModalCard}
          setCreditCardPayment={setCreditCardPayment}
          setNewCreditCard={setNewCreditCard}
        />
      </Modal>
      <Modal
        visible={modalError}
        onRequestClose={handleHardwareBackPress}
        transparent
        statusBarTranslucent
      >
        <PaymentModalError setIsVisible={setModalError} />
      </Modal>
    </Container>
  );
};

export default PaymentScreen;
