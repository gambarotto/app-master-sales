import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IProduct } from '../../contexts/products';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  padding: 16px;
`;
export const TitleFavorites = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerFavoriteList = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;
export const FavoriteList = styled(FlatList as new () => FlatList<IProduct>)``;
