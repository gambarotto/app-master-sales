/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
interface PropsItem {
  item: IOrders;
  index: number;
}
const OrdersScreen: React.FC = () => {
  const { data: orders } = useFetch<IOrders[]>('orders', 'orders');

  const renderItem = ({ item, index }: PropsItem) => (
    <OrderItem order={item} index={index} />
  );
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
          renderItem={renderItem}
        />
      </ContainerOrders>
    </Container>
  );
};

export default OrdersScreen;
