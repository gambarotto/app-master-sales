import Constants from 'expo-constants';
import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

interface PropsButton {
  confirmedButton: boolean;
}
const { statusBarHeight } = Constants;
export const ContainerKeyboarding = styled.KeyboardAvoidingView`
  flex: 1;
`;
export const Container = styled(MotiView)`
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
  flex: 1;
  margin-top: ${`${statusBarHeight + 24}px`};
  padding: 16px;
`;
export const TitleModal = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  text-align: center;
  font-size: 14px;
  font-family: 'Roboto-Bold';
  margin-bottom: 16px;
`;
export const ContainerInputs = styled.View`
  flex: 1;
  margin-top: 24px;
`;
export const ContainerForgotPassword = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  margin-bottom: 16px;
`;
export const TextForgotPassword = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const ActionButton = styled.TouchableOpacity<PropsButton>`
  flex: 1;
  max-height: 50px;
  border-radius: 8px;
  ${(props) => css`
    background-color: ${props.confirmedButton
      ? props.theme.colors.secondary
      : props.theme.colors.gray4};
  `}
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const TextActionButton = styled.Text<PropsButton>`
  ${(props) => css`
    color: ${props.confirmedButton
      ? props.theme.colors.white
      : props.theme.colors.gray1};
  `}
  font-size:14px;
  font-family: 'Roboto-Bold';
`;
