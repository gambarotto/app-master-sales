import styled, { css } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import { ICategoryItem } from '.';

const { statusBarHeight } = Constants;

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  padding: 16px;
`;
export const ContainerImageAndCart = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
`;
export const ContainerCart = styled.TouchableOpacity``;
export const IconCart = styled(MaterialIcons)`
  margin-left: 8px;
`;
export const ContainerSearch = styled.View`
  flex-direction: row;
  ${(props) => css`
    background-color: ${props.theme.colors.gray4};
  `}
  height:50px;
  border-radius: 25px;
  margin-top: 16px;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;
export const IconSearch = styled(MaterialIcons)`
  margin-right: 8px;
`;
export const InputSearch = styled.TextInput`
  flex: 1;
`;
export const ContainerCategories = styled.View`
  width: 100%;
  padding-left: 16px;
  justify-content: space-between;
`;
export const TitleCategories = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerCategoryList = styled.View`
  margin-bottom: 8px;
`;
export const CategoriesList = styled(
  FlatList as new () => FlatList<ICategoryItem>,
)``;
export const CategoryItemContainer = styled.TouchableOpacity`
  width: 120px;
  height: 60px;
  border-radius: 4px;
  margin-right: 8px;
`;
export const CategoryItemImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  justify-content: flex-end;
  padding-left: 8px;
`;
export const CategoryItemTitle = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
`;
export const ContainerProducts = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;
export const TitleProducts = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerProductList = styled.View`
  height: 100%;
  width: 100%;
`;
export const ProductList = styled(FlatList as new () => FlatList)``;
