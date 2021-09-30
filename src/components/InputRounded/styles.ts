import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface ContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
  heightContainer: number;
  inputActiveColor: 'primary' | 'secondary' | 'tertiary';
}
interface TextLabelProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  position: relative;
  max-width: 100%;
  padding: 2px 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  ${(props) => css`
    height: ${`${props.heightContainer}px`};
    background-color: ${props.theme.colors.white};
    border-color: ${props.theme.colors.gray3};
  `}

  border-radius: 8px;
  margin-bottom: 10px;
  z-index: 5;

  /* CONDITIONALS */
  ${(props) =>
    props.isFocus &&
    css`
      border-width: 1px;
      border-color: ${props.theme.colors[props.inputActiveColor]};
    `}
  ${(props) =>
    props.isFilled &&
    css`
      border-width: 0.5px;
      border-color: ${props.theme.colors[props.inputActiveColor]};
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-width: 0.5px;
      border-color: ${props.theme.colors.red};
    `}
`;
export const ContainerTextLabel = styled.View``;
export const TextLabel = styled(Animated.Text)<TextLabelProps>`
  position: absolute;
  ${(props) => css`
    color: ${props.isErrored
      ? props.theme.colors.red
      : props.theme.colors.gray3};
    background-color: ${props.theme.colors.white};
  `}
  padding:0 4px;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin-left: 16px;
  left: 24px;
  margin-top: auto;
`;
export const ContainerTextInput = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(MaterialIcons)`
  margin-right: 16px;
`;

export const TextError = styled.Text`
  position: absolute;
  ${(props) => css`
    color: ${props.theme.colors.secondary};
    background-color: ${props.theme.colors.white};
  `}
  padding:0 4px;
  font-size: 9px;
  font-family: 'Roboto-Bold';
  right: 8px;
  bottom: -4px;
`;
export const styleTextInput = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
});
