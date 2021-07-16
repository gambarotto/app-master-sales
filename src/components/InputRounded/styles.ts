import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  max-width: 100%;
  height: 50px;
  border-radius: 4px;
  ${(props) => css`
    background-color: ${props.theme.colors.white2};
  `}
  margin:0px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  z-index: 5;

  /* CONDITIONALS */
  ${(props) =>
    props.isFocus &&
    css`
      border-color: ${props.theme.colors.gray3};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      border-color: ${props.theme.colors.gray3};
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.red};
    `}
`;
export const Icon = styled(MaterialIcons)`
  margin-right: 16px;
`;

export const TextError = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size: 8px;
  font-family: 'Roboto-Regular';
  align-self: flex-end;
`;
export const styleTextInput = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 12,
    paddingLeft: 8,
  },
});
