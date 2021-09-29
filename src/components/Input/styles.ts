import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
  selectedColor: 'primary' | 'secondary' | 'tertiary';
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  min-height: 50px;
  justify-content: flex-end;
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
      border-bottom-color: ${props.theme.colors[props.selectedColor]};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      border-bottom-color: ${props.theme.colors[props.selectedColor]};
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-bottom-color: ${props.theme.colors.red};
    `}
`;
export const LabelInput = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size: 12px;
  font-family: 'Roboto-Bold';
  align-self: flex-start;
  margin-bottom: 8px;
`;
export const ContainerInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;
export const Icon = styled(MaterialIcons)`
  margin-right: 16px;
`;
export const Warning = styled(MaterialIcons)`
  position: absolute;
  right: 4px;
  top: 4px;
`;
export const styleTextInput = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
