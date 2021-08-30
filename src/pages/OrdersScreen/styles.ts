import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IOrders } from '.';

const { statusBarHeight } = Constants;

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  padding: 16px;
`;
export const ContainerOrders = styled.View`
  flex: 1;
  padding: 0 16px;
`;
export const TitleOrders = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const OrderList = styled(FlatList as new () => FlatList<IOrders>)``;
