/* eslint-disable import/no-duplicates */
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import IconBack from '../../components/IconBack';
import logoImage from '../../assets/logo_horizontal_white.png';

import {
  Container,
  ContainerHeader,
  ContainerInfo,
  ContainerItemOrderProduct,
  ImageLogo,
  ItemNameProduct,
  ItemPriceProduct,
  LineText,
  OrderProductList,
  TextOrder,
  TextOrderDate,
  TextTotal,
  TextTotalCurrency,
} from './styles';
import { useFetch } from '../../hooks/useFetch';
import { IAddress } from '../../contexts/auth';
import { IProduct } from '../../contexts/products';
import Currency from '../../components/Currency';
import themeGlobal from '../../styles/global';

interface ResponseOrderDate {
  dateDistance: string;
  dateFormat: string;
}
interface IOrderId {
  id: string;
}
interface ITransaction {
  id: string;
  status: string;
  payment_method: string;
  card_id: string;
}
export interface IProductOrder {
  quantity: number;
  price: number;
  product: Omit<IProduct, 'categories'>;
}

interface IOrder {
  id: string;
  order_number: number;
  amount: number;
  delivery: boolean;
  delivery_fee: number;
  created_at: string;
  updated_at: string;
  transaction: ITransaction;
  products: IProductOrder[];
  billing: IAddress;
  shipping: IAddress;
}

const OrderScreen: React.FC = () => {
  const route = useRoute();
  const { id: order_id } = route.params as IOrderId;
  const navigation = useNavigation();
  const { data: order } = useFetch<IOrder>(
    `product-${order_id}`,
    `orders/${order_id}`,
  );

  const orderDate = (): ResponseOrderDate | undefined => {
    if (order) {
      const dateOrder = new Date(order?.created_at);
      const dateDistance = `( ${formatDistance(dateOrder, new Date(), {
        addSuffix: true,
        locale: ptBR,
      })} )`;
      const dateFormat = format(dateOrder, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
      return { dateDistance, dateFormat };
    }
    return undefined;
  };
  if (!order) {
    return (
      <Container>
        <ActivityIndicator color={themeGlobal.colors.secondary} />
      </Container>
    );
  }
  return (
    <Container>
      <ContainerHeader>
        <IconBack
          styleElement={{ left: 16 }}
          onPress={() => navigation.goBack()}
          background
        />
        <ImageLogo source={logoImage} />
      </ContainerHeader>
      <ContainerInfo>
        <TextOrder>{`Pedido #${order?.order_number}`}</TextOrder>
        <TextOrderDate>{orderDate()?.dateFormat}</TextOrderDate>
        <OrderProductList
          data={order?.products}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <ContainerItemOrderProduct key={item.product.id}>
              <ItemNameProduct>{`${item.quantity} x ${item.product.name}`}</ItemNameProduct>
              <ItemPriceProduct>
                <Currency value={item.price} />
              </ItemPriceProduct>
            </ContainerItemOrderProduct>
          )}
        />
        <LineText>
          <TextTotal>Taxa de entrega</TextTotal>
          <TextTotalCurrency>
            <Currency value={order.delivery_fee} />
          </TextTotalCurrency>
        </LineText>
        <LineText>
          <TextTotal>Total</TextTotal>
          <TextTotalCurrency>
            <Currency value={order.amount} />
          </TextTotalCurrency>
        </LineText>
      </ContainerInfo>
    </Container>
  );
};

export default OrderScreen;
