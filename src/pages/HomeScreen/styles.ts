import styled, { css } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import { MotiText, MotiView } from 'moti';
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
export const ContainerCategories = styled.View`
  width: 100%;
  padding-left: 16px;
  justify-content: space-between;
`;
export const ContainerTitleAndClearCategories = styled(MotiView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
export const TitleCategories = styled(MotiText)`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
`;
export const ContainerAnimateIconClear = styled(MotiView)`
  opacity: 1;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  justify-content: center;

  overflow: hidden;
`;
export const ContainerIconClear = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Icon = styled(MaterialIcons)`
  margin-right: 8px;
`;
export const TextIcon = styled(MotiText)`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:10px;
  font-family: 'Roboto-Regular';
`;
export const ContainerCategoryList = styled.View`
  margin-bottom: 8px;
`;
export const CategoriesList = styled(
  FlatList as new () => FlatList<ICategoryItem>,
)``;
export const ContainerAnimatedItemCategory = styled(MotiView)``;
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
export const TitleProducts = styled(MotiText)`
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
