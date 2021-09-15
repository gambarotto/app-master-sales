import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ConfirmedOrderProducts } from '.';

const { statusBarHeight } = Constants;
const PADDING = 16;

export const Container = styled.View`
  flex: 1;
  padding: ${`${PADDING}px`};
`;
export const ContainerHeader = styled.View`
  padding-top: ${`${statusBarHeight}px`};
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: ${`${PADDING}px`};
  padding-right: ${`${PADDING}px`};
`;
export const ImageLogo = styled.Image`
  height: 45px;
  width: 160px;
`;
export const ContainerBody = styled.View`
  flex: 1;
  margin-top: ${`${PADDING + 8}px`};
`;
export const ContainerConfirmOrder = styled.View`
  border-bottom-width: 0.5px;
  padding-bottom: ${`${PADDING - 8}px`};
  ${(props) => css`
    border-bottom-color: ${props.theme.colors.gray3};
  `}
`;
export const TextConfirmedOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size: 14px;
  font-family: 'Roboto-Bold';
`;
export const TextExplainOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size: 12px;
  font-family: 'Roboto-Regular';
  margin-top: ${`${PADDING}px`};
`;
export const ContainerShippingAddress = styled.View`
  margin-top: ${`${PADDING - 8}px`};
`;
export const TitleAddress = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size: 12px;
  font-family: 'Roboto-Bold';
  margin-top: ${`${PADDING - 8}px`};
`;
export const TextAddressAlias = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size: 12px;
  font-family: 'Roboto-Bold';
  margin-top: ${`${PADDING}px`};
  margin-bottom: ${`${PADDING - 8}px`};
`;
export const TextAddressLine = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size: 12px;
  font-family: 'Roboto-Regular';
  margin-top: ${`${PADDING - 8}px`};
`;
export const LineWithTwoText = styled.View`
  flex-direction: row;
  height: 40px;
  align-items: center;
  /* margin-top: ${`${PADDING}px`}; */
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-bottom-color: ${props.theme.colors.gray3};
  `}
`;
export const TextOrderDeliveryDate = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size: 12px;
  font-family: 'Roboto-Regular';
`;
export const TextOrderDate = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size: 12px;
  font-family: 'Roboto-Bold';
  margin-left: 8px;
`;
export const ContainerOrderDetails = styled.View`
  margin-top: ${`${PADDING}px`};
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
`;
export const Title = styled.Text`
  font-size: 12px;
  font-family: 'Roboto-Bold';
  margin-bottom: ${`${PADDING}px`};
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
`;
export const OrderProductList = styled(
  FlatList as new () => FlatList<ConfirmedOrderProducts>,
)`
  min-height: 50px;
  max-height: 110px;
`;
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
    color: ${props.theme.colors.tertiary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const ItemPriceProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const ContainerDescriptionOrderCosts = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TextDescriptionItemOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;
export const TextTotalOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:12px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerButton = styled.View`
  height: 60px;
`;
