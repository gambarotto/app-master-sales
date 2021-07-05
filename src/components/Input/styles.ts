import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  border-bottom-width: 1px;
  margin-bottom: 8px;
  ${(props) =>
    css`
      border-bottom-color: ${props.theme.colors.gray};
    `}

  /* CONDITIONALS */
  ${(props) =>
    props.isFocus &&
    css`
      border-bottom-color: ${props.theme.colors.secondary};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      border-bottom-color: ${props.theme.colors.secondary};
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-bottom-color: ${props.theme.colors.red};
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
  align-self: flex-end;
`;
export const styleTextInput = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
