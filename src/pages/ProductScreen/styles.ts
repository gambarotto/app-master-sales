import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
`;
export const ContainerProductImage = styled.View`
  height: 40%;
  width: 100%;
`;
export const ProductImage = styled.Image`
  height: 100%;
  width: 100%;
`;
export const ContainerIconBack = styled.TouchableOpacity`
  position: absolute;
  top: ${`${statusBarHeight + 16}px`};
  left: 16px;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
  z-index: 5;
`;
export const IconBack = styled(MaterialIcons)``;

export const ContainerInfo = styled.View`
  flex: 1;
  margin-top: -24px;
  padding: 16px;
  padding-top: 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
`;
export const ContainerNameAndPackage = styled.View``;
export const TextNameProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:24px;
  font-weight: bold;
`;
export const ContainerQuantityAndPrice = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;
export const ContainerQuantity = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerIconQuantity = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
export const IconQuantity = styled(MaterialIcons)``;
export const TextNumberQuantity = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:24px;
  margin-left: 8px;
  margin-right: 8px;
`;
export const ContainerTextPrice = styled.View``;
export const TextPrice = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  font-size:24px;
  font-weight: bold;
`;
