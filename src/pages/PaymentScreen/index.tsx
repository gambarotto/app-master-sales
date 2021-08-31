/* eslint-disable no-restricted-syntax */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Modal, useWindowDimensions } from 'react-native';
import { MotiView } from 'moti';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import IconBack from '../../components/IconBack';
import { IOrder } from '../CartScreen';

import {
  CardList,
  Container,
  ContainerAddress,
  ContainerAddressData,
  ContainerButton,
  ContainerCardPayment,
  ContainerDescriptionOrderCosts,
  ContainerHeader,
  ContainerOrderDetails,
  ContainerPayment,
  ContainerPaymentsMethods,
  ContainerSubTitle,
  ContainerTitleAndPaymentsMethods,
  ImageLogo,
  SubTitle,
  TextAddress,
  TextCardPayment,
  TextDescriptionItemOrder,
  TextTotalOrder,
  Title,
  TitleAliasAddress,
  ButtonConfirm,
  ContainerModal,
  ContainerModalContent,
  TextModal,
} from './styles';
import CreditCardItem from '../../components/CreditCardItem';

export interface ICreditCard {
  id: string;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  expiration_date: string;
}
const PaymentScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [creditCard, setCreditCard] = useState<ICreditCard>({} as ICreditCard);
  const cards: ICreditCard[] = [
    {
      id: 'yujo',
      brand: 'visa',
      holder_name: 'Diego Gambarotto',
      first_digits: '444222',
      last_digits: '5555',
      expiration_date: '1122',
    },
    {
      id: 'yujoujg',
      brand: 'master',
      holder_name: 'Diego Carvalho',
      first_digits: '777333',
      last_digits: '1234',
      expiration_date: '1023',
    },
  ];
  const [modalCard, setModalCard] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params as IOrder;
  const { height: heightDevice } = useWindowDimensions();

  const handlePaymentMethod = useCallback((payment: string) => {
    setPaymentMethod(payment);
    if (payment === 'credit-card') {
      setModalCard(true);
    }
  }, []);
  const textAddressFormat = useMemo((): string | undefined => {
    if (order.delivery_address) {
      const { street, number, district } = order.delivery_address;
      const text = `${street}, ${number} - ${district}`;
      return text;
    }
    return undefined;
  }, [order.delivery_address]);

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
        <ContainerSubTitle>
          <SubTitle>Entrega</SubTitle>
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
      </ContainerOrderDetails>
      <ContainerPayment>
        <ContainerTitleAndPaymentsMethods>
          <ContainerSubTitle>
            <SubTitle>Pagamento</SubTitle>
          </ContainerSubTitle>
          <ContainerPaymentsMethods>
            <ContainerCardPayment
              onPress={() => handlePaymentMethod('pix')}
              selected={paymentMethod === 'pix'}
            >
              <TextCardPayment selected={paymentMethod === 'pix'}>
                Pix
              </TextCardPayment>
            </ContainerCardPayment>
            <ContainerCardPayment
              style={{ marginLeft: 16 }}
              onPress={() => handlePaymentMethod('credit-card')}
              selected={paymentMethod === 'credit-card'}
            >
              <TextCardPayment selected={paymentMethod === 'credit-card'}>
                Cartão de Crédito
              </TextCardPayment>
            </ContainerCardPayment>
          </ContainerPaymentsMethods>
        </ContainerTitleAndPaymentsMethods>
        <ContainerButton>
          <Button color="secondary" textSize={16}>
            Ir para pagamento
          </Button>
        </ContainerButton>
      </ContainerPayment>
      <Modal
        style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}
        visible={modalCard}
        transparent
        statusBarTranslucent
      >
        <ContainerModal
          from={{ opacity: 0, backgroundColor: '#000' }}
          animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          transition={{ type: 'timing', duration: 350 }}
        >
          <ContainerModalContent
            from={{ translateY: heightDevice }}
            animate={{ translateY: 0 }}
            transition={{ type: 'timing', duration: 350 }}
          >
            <TextModal>Cartão de Crédito</TextModal>
            <CardList
              data={cards}
              keyExtractor={(card) => card.id}
              renderItem={({ item }) => (
                <CreditCardItem
                  card={item}
                  setCreditCardData={setCreditCard}
                  selected={creditCard.id === item.id}
                />
              )}
            />
            <ButtonConfirm onPress={() => setModalCard(false)} />
          </ContainerModalContent>
        </ContainerModal>
      </Modal>
    </Container>
  );
};

export default PaymentScreen;
