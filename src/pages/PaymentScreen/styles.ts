import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

interface PaymentMethod {
  selected: boolean;
}
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
export const ContainerOrderDetails = styled.View``;
export const Title = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 24px;
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
  font-size:16px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerSubTitle = styled.View``;
export const SubTitle = styled.Text`
  margin-top: 16px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:16px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const ContainerAddress = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;
export const ContainerAddressData = styled.View``;
export const TitleAliasAddress = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:16px;
  font-family: 'Roboto-Bold';
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
export const ContainerCardPayment = styled.TouchableOpacity<PaymentMethod>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  border-width: 0.8px;
  ${(props) => css`
    border-color: ${props.selected
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
`;
export const TextCardPayment = styled.Text<PaymentMethod>`
  ${(props) => css`
    color: ${props.selected
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  padding: 12px;
`;
export const ContainerButton = styled.View`
  height: 60px;
`;
