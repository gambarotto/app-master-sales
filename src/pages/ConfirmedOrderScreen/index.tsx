import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import logoImage from '../../assets/logo_horizontal_catarina.png';
import Button from '../../components/Button';
import Currency from '../../components/Currency';
import { IAddress } from '../../contexts/auth';
import { useCart } from '../../contexts/cart';
import { useFetch } from '../../hooks/useFetch';

import {
  Container,
  ContainerBody,
  ContainerButton,
  ContainerConfirmOrder,
  ContainerDescriptionOrderCosts,
  ContainerHeader,
  ContainerItemOrderProduct,
  ContainerOrderDetails,
  ContainerShippingAddress,
  ImageLogo,
  ItemNameProduct,
  ItemPriceProduct,
  LineWithTwoText,
  OrderProductList,
  TextAddressAlias,
  TextAddressLine,
  TextConfirmedOrder,
  TextDescriptionItemOrder,
  TextExplainOrder,
  TextOrderDate,
  TextOrderDeliveryDate,
  TextTotalOrder,
  Title,
  TitleAddress,
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
  const [totalProducts] = useState(
    order.order_product.reduce(
      (acc, currentProduct) =>
        acc + currentProduct.quantity * currentProduct.unit_price,
      0,
    ),
  );
  const { data: shipping_address } = useFetch<IAddress>(
    `shipping_address-${order.shipping_address_id}`,
    `users/adresses/me/${order.shipping_address_id}`,
  );

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
        <ContainerConfirmOrder>
          <TextConfirmedOrder>Pedido Realizado!</TextConfirmedOrder>
          <TextExplainOrder>
            Nós já recebemos o seu pedido, muito obrigada!
          </TextExplainOrder>
        </ContainerConfirmOrder>

        <ContainerShippingAddress>
          <TitleAddress>Endereço para entrega</TitleAddress>
          <TextAddressAlias>{shipping_address?.alias}</TextAddressAlias>
          <TextAddressLine>
            {`${shipping_address?.street}, ${shipping_address?.number} - ${shipping_address?.district}, ${shipping_address?.city}`}
          </TextAddressLine>
          <TextAddressLine>{`${shipping_address?.complement}`}</TextAddressLine>
        </ContainerShippingAddress>
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
                  <Currency value={item.unit_price * item.quantity} />
                </ItemPriceProduct>
              </ContainerItemOrderProduct>
            )}
          />
          <ContainerDescriptionOrderCosts style={{ marginTop: 16 }}>
            <TextDescriptionItemOrder>Produtos</TextDescriptionItemOrder>
            <TextDescriptionItemOrder>
              <Currency value={totalProducts} />
            </TextDescriptionItemOrder>
          </ContainerDescriptionOrderCosts>
          <ContainerDescriptionOrderCosts>
            <TextDescriptionItemOrder>Taxa de entrega</TextDescriptionItemOrder>
            <TextDescriptionItemOrder>
              <Currency value={order.delivery_fee} />
            </TextDescriptionItemOrder>
          </ContainerDescriptionOrderCosts>
          <ContainerDescriptionOrderCosts>
            <TextTotalOrder>Total do pedido</TextTotalOrder>
            <TextTotalOrder>
              <Currency value={totalProducts + order.delivery_fee} />
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
