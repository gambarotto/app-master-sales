import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ICartProduct } from '../../contexts/cart';

interface PropsCard {
  isChecked: boolean;
}

const { statusBarHeight } = Constants;

export const ContainerHeaderWithoutItems = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${`${statusBarHeight + 8}px`};
  margin-left: 8px;
  margin-right: 8px;
`;
export const ContainerWithOutItems = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  position: relative;
`;
export const ContainerHeader = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
`;
export const IconHeader = styled(MaterialIcons)``;

export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
  margin-bottom: 16px;
  align-self: center;
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
  max-height: 30%;
`;
export const CartProductsList = styled(
  FlatList as new () => FlatList<ICartProduct>,
)``;
export const ButtonAddMoreItems = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-top-width: 0.7px;
  ${(props) =>
    css`
      border-top-color: ${props.theme.colors.gray3};
    `};
`;
export const TextAddMoreItems = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  text-align: center;
  margin-top: 8px;
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
  margin-bottom: 8px;
`;
export const ContainerCard = styled.TouchableOpacity<PropsCard>`
  width: 100%;
  border-width: 1px;
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;
  ${(props) => css`
    border-color: ${props.isChecked
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
`;
export const ContainerTopCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerLabelAndPrice = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 8px;
`;
export const DeliveryLabel = styled.Text<PropsCard>`
  ${(props) =>
    css`
      color: ${props.isChecked
        ? props.theme.colors.secondary
        : props.theme.colors.gray3};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
`;
export const DeliveryPrice = styled.Text<PropsCard>`
  ${(props) =>
    css`
      color: ${props.isChecked
        ? props.theme.colors.secondary
        : props.theme.colors.gray3};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
`;
export const ContainerBottomCard = styled.View`
  height: 40px;
  margin-top: 16px;
`;
export const TextAliasAddress = styled.Text<PropsCard>`
  ${(props) =>
    css`
      color: ${props.isChecked
        ? props.theme.colors.secondary
        : props.theme.colors.gray3};
    `};
  font-family: 'Roboto-Bold';
  font-size: 14px;
`;
export const ContainerAddress = styled.View`
  flex: 1;
  margin-top: 8px;
  margin-bottom: 8px;
`;
export const TextAddress = styled.Text<PropsCard>`
  ${(props) =>
    css`
      color: ${props.isChecked
        ? props.theme.colors.secondary
        : props.theme.colors.gray3};
    `};
  font-family: 'Roboto-Regular';
  font-size: 12px;
`;
export const ContainerBottom = styled.View`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 100%;
`;
export const ContainerTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export const TextTotal = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
`;
export const TextTotalValue = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  font-family: 'Roboto-Bold';
  font-size: 14px;
`;
export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonTrash = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
  ${(props) =>
    css`
      background-color: ${props.theme.colors.primary};
    `};
`;
export const Icon = styled(MaterialIcons)``;
