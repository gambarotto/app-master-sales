import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  padding-top: 0;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
  margin-bottom: 16px;
  align-self: center;
`;
export const ContainerOrderDetails = styled.View`
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
`;
export const Title = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Bold';
  margin-bottom: 24px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
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
  font-size:14px;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;
export const TextTotalOrder = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerSubTitle = styled.View``;
export const SubTitle = styled.Text`
  margin-top: 16px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerAddress = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
`;
export const ContainerAddressData = styled.View``;
export const TitleAliasAddress = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;
export const TextAddress = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const ContainerPayment = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: 8px;
`;
export const ContainerTitleAndPaymentsMethods = styled.View``;
export const ContainerPaymentsMethods = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerCardPayment = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const TextCardPayment = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size: 14px;
  font-family: 'Roboto-Regular';
  margin-top: 8px;
`;
export const ContainerButton = styled.View`
  height: 60px;
`;
export const ContainerSelectedCard = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-top: 16px;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
`;
export const BrandCreditCard = styled.Image`
  height: 20px;
  width: 35px;
  margin-left: 8px;
`;
export const NumberCard = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  margin-left:8px;
`;
export const HolderName = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  margin-left:8px;
`;
