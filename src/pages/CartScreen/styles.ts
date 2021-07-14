import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import { ICartProductItem } from '.';

const { statusBarHeight } = Constants;

export const ContainerWithOutItems = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const TextWithOutItems = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  ${(props) =>
    css`
      color: ${props.theme.colors.gray3};
    `};
  text-align: center;
`;

export const Container = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const TitlePage = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 24px;
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `};
  margin-bottom: 16px;
`;
export const ContainerCartProductList = styled.View`
  max-height: 40%;
`;
export const CartProductsList = styled(
  FlatList as new () => FlatList<ICartProductItem>,
)``;
export const ButtonAddMoreItems = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
export const TextAddMoreItems = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  text-align: center;
  margin-top: 16px;
`;
export const ContainerDeliveryAddress = styled.View`
  flex: 1;
`;
export const TitleDelivery = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 16px;
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `};
  margin-top: 16px;
`;
