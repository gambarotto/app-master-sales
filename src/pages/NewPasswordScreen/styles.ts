import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const TextInsertPassword = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  text-align: center;
`;
export const ContainerInputPassword = styled.View`
  height: 50px;
  width: 200px;
  margin-top: 16px;
  border-radius: 8px;
  border-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
  justify-content: center;
  align-items: center;
`;
export const TextInputPassword = styled.TextInput`
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 1.2px;
  text-align: center;
`;
export const ConfirmButtonContainer = styled(RectButton)`
  position: absolute;
  height: 50px;
  width: 160px;
  border-width: 1px;
  border-radius: 30px;
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
    border-color: ${props.theme.colors.tertiary};
    background-color: ${props.theme.colors.tertiary};
  `}
  justify-content: center;
  align-items: center;
  bottom: 0;
  margin-bottom: 16px;
`;
export const ConfirmTextButton = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
`;
