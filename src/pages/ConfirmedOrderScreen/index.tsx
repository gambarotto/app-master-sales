import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import { useCart } from '../../contexts/cart';

import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerDescriptionOrderCosts,
  ContainerHeader,
  ContainerItemOrderProduct,
  ContainerOrderDetails,
  ImageLogo,
  ItemNameProduct,
  ItemPriceProduct,
  LineWithTwoText,
  OrderProductList,
  TextConfirmedOrder,
  TextDescriptionItemOrder,
  TextExplainOrder,
  TextOrderDate,
  TextOrderDeliveryDate,
  TextTotalOrder,
  Title,
} from './styles';

export interface ConfirmedOrderProducts {
  id: string;
  quantity: number;
  tangible: boolean;
  title: string;
  unit_price: number;
}
interface ConfirmedOrder {
  amount: number;
  created_at: string;
  delivery: true;
  delivery_fee: number;
  id: string;
  order_number: number;
  order_product: ConfirmedOrderProducts[];
  shipping_address_id: string;
  user_id: string;
}

const ConfirmedOrderScreen: React.FC = () => {
  const { clearCart } = useCart();
  const navigation = useNavigation();
  const params = useRoute();
  const order = params.params as ConfirmedOrder;

  const handleButtonBack = useCallback(() => {
    clearCart();
    navigation.navigate('Tabs');
  }, [clearCart, navigation]);

  return (
    <Container>
      <ContainerHeader>
        <ImageLogo source={logoImage} />
      </ContainerHeader>
      <ContainerBody>
        <TextConfirmedOrder>Pedido Realizado!</TextConfirmedOrder>
        <TextExplainOrder>
          Nós já recebemos o seu pedido, muito obrigada!
        </TextExplainOrder>
        <LineWithTwoText>
          <TextOrderDeliveryDate>Entrega prevista para:</TextOrderDeliveryDate>
          <TextOrderDate>19/11/21</TextOrderDate>
        </LineWithTwoText>
        <ContainerOrderDetails>
          <Title>{`Pedido #${order.order_number}`}</Title>

          <OrderProductList
            data={order.order_product}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ContainerItemOrderProduct>
                <ItemNameProduct>{`${item.quantity}x ${item.title}`}</ItemNameProduct>
                <ItemPriceProduct>
                  <Currency value={item.unit_price} />
                </ItemPriceProduct>
              </ContainerItemOrderProduct>
            )}
          />
          <ContainerDescriptionOrderCosts>
            <TextDescriptionItemOrder>Produtos</TextDescriptionItemOrder>
            <TextDescriptionItemOrder>
              <Currency value={0} />
            </TextDescriptionItemOrder>
          </ContainerDescriptionOrderCosts>
          <ContainerDescriptionOrderCosts>
            <TextDescriptionItemOrder>Taxa de entrega</TextDescriptionItemOrder>
            <TextDescriptionItemOrder>
              <Currency value={0} />
            </TextDescriptionItemOrder>
          </ContainerDescriptionOrderCosts>
          <ContainerDescriptionOrderCosts>
            <TextTotalOrder>Total do pedido</TextTotalOrder>
            <TextTotalOrder>
              <Currency value={0} />
            </TextTotalOrder>
          </ContainerDescriptionOrderCosts>
        </ContainerOrderDetails>
      </ContainerBody>
      <ContainerButton>
        <Button onPress={handleButtonBack} color="secondary" textSize={14}>
          Voltar
        </Button>
      </ContainerButton>
    </Container>
  );
};

export default ConfirmedOrderScreen;
