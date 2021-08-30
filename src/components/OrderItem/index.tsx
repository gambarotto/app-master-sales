/* eslint-disable import/no-duplicates */
import React from 'react';
import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';
import { IOrders } from '../../pages/OrdersScreen';
import Currency from '../Currency';

import {
  Container,
  TextCurrency,
  TextDescription,
  TextTotal,
  TextTotalCurrency,
  TitleDate,
  LineText,
  ContainerTitle,
  SubTitleDate,
} from './styles';

interface IProps {
  order: IOrders;
}
interface ResponseOrderDate {
  dateDistance: string;
  dateFormat: string;
}
const OrderItem: React.FC<IProps> = ({
  order: { id, amount, delivery_fee, created_at },
}) => {
  const navigation = useNavigation();

  const orderDate = (): ResponseOrderDate => {
    const dateOrder = new Date(created_at);
    const dateDistance = `( ${formatDistance(dateOrder, new Date(), {
      addSuffix: true,
      locale: ptBR,
    })} )`;
    const dateFormat = format(dateOrder, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return { dateDistance, dateFormat };
  };

  return (
    <Container onPress={() => navigation.navigate('Order', { id })}>
      <ContainerTitle>
        <TitleDate>{orderDate().dateFormat}</TitleDate>
        <SubTitleDate>{orderDate().dateDistance}</SubTitleDate>
      </ContainerTitle>
      <LineText>
        <TextDescription>Produtos</TextDescription>
        <TextCurrency>
          <Currency value={amount} />
        </TextCurrency>
      </LineText>
      <LineText>
        <TextDescription>Taxa de entrega</TextDescription>
        <TextCurrency>
          <Currency value={delivery_fee} />
        </TextCurrency>
      </LineText>
      <LineText style={{ marginTop: 8 }}>
        <TextTotal>Total</TextTotal>
        <TextTotalCurrency>
          <Currency value={amount + delivery_fee} />
        </TextTotalCurrency>
      </LineText>
    </Container>
  );
};

export default OrderItem;
