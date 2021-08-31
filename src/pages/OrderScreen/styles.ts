import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IProductOrder } from '.';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
`;
export const ContainerHeader = styled.View`
  padding-top: ${`${statusBarHeight}px`};
  ${(props) => css`
    background-color: ${props.theme.colors.secondary};
  `}
  position: relative;
  width: 100%;
  height: 150px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;
export const ImageLogo = styled.Image`
  height: 45px;
  width: 160px;
`;
export const ContainerInfo = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
  padding:20px;
`;
export const TextOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const TextOrderDate = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  margin-bottom: 16px;
`;
export const OrderProductList = styled(
  FlatList as new () => FlatList<IProductOrder>,
)``;
export const ContainerItemOrderProduct = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding-left: 2px;
`;
export const ItemNameProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const ItemPriceProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:13px;
  font-family: 'Roboto-Regular';
`;
export const LineText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 13px;
`;
export const TextTotal = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray2};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
`;
export const TextTotalCurrency = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray2};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
`;
