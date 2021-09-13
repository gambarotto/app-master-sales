import React from 'react';
import HeaderScreen from '../../components/HeaderScreen';
import { useFetch } from '../../hooks/useFetch';

import {
  Container,
  ContainerHeader,
  ContainerOrders,
  OrderList,
  TitleOrders,
} from './styles';
import OrderItem from '../../components/OrderItem';
import LoadingContent from '../../components/LoadingContent';

export interface IOrders {
  id: string;
  order_number: number;
  amount: number;
  delivery: boolean;
  delivery_fee: number;
  created_at: string;
}

const OrdersScreen: React.FC = () => {
  const { data: orders } = useFetch<IOrders[]>('orders', 'orders');

  if (orders?.length === undefined) {
    return <LoadingContent textLoading="Carregando..." />;
  }
  return (
    <Container>
      <ContainerHeader>
        <HeaderScreen />
      </ContainerHeader>
      <ContainerOrders>
        <TitleOrders>Pedidos</TitleOrders>
        <OrderList
          data={orders}
          keyExtractor={(order) => order.id}
          renderItem={({ item, index }) => (
            <OrderItem order={item} index={index} />
          )}
        />
      </ContainerOrders>
    </Container>
  );
};

export default OrdersScreen;
