import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

interface IButtonFavorite {
  isFavorite: boolean;
}

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
`;
export const ContainerProductImage = styled(MotiView)`
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

export const ContainerInfo = styled(MotiView)`
  flex: 1;
  margin-top: -24px;
  padding: 8px;
  padding-bottom: 16px;
  margin-left: 8px;
  margin-right: 8px;
  padding-top: 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
`;
export const ContainerNameAndPrice = styled.View``;
export const ContainerNameAndPackage = styled.View`
  flex-direction: row;
`;
export const TextNameProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:16px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;

export const ContainerProductPackage = styled(MotiView)`
  flex: 1;
  margin-left: 8px;
`;
export const TextPackage = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:16px;
  font-family: 'Roboto-Regular';
`;
export const ContainerQuantity = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;
export const ContainerHandleQuantity = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
    background-color: ${props.theme.colors.white};
  `}
  border-radius:25px;
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
  font-size:18px;
  font-family: 'Roboto-Regular';
  margin-left: 8px;
  margin-right: 8px;
`;
export const ContainerTextPrice = styled.View``;
export const TextPrice = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
`;
export const ContainerDescription = styled.View`
  margin-top: 64px;
`;
export const TitleDescription = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
`;
export const TextDescription = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.gray};
  `}
`;

export const ContainerActionButtons = styled.View`
  /* position: absolute;
  bottom: 16px;
  left: 16px;
  width: 100%; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerAnimateButtonFavorite = styled(MotiView)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 16px;
`;
export const ButtonFavorite = styled.TouchableOpacity<IButtonFavorite>`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  ${(props) => css`
    border-color: ${props.theme.colors.red};
    background-color: ${props.isFavorite
      ? props.theme.colors.red
      : props.theme.colors.white};
  `}
`;
export const IconFavorite = styled(MaterialIcons)``;
