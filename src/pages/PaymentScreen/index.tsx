import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import IconBack from '../../components/IconBack';
import { IOrder } from '../CartScreen';

import {
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
} from './styles';

const PaymentScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params as IOrder;

  const handlePaymentMethod = useCallback((payment: string) => {
    setPaymentMethod(payment);
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
        <ImageLogo source={logoImage} />
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
    </Container>
  );
};

export default PaymentScreen;
