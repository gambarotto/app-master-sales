import { Dimensions, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

const { width, height } = Dimensions.get('screen');
export const Container = styled.View`
  position: relative;
  flex: 1;
`;

export const FlowForgetPassword = styled(FlatList as new () => FlatList)``;

export const FlowContainer = styled.View`
  width: ${`${width}px`};
  height: ${`${height}px`};
  justify-content: center;
  align-items: center;
  border-width: 1px;
`;
export const TextFirstStep = styled.Text`
  position: absolute;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  text-align: center;
  align-self: center;
  margin-top: ${`${height / 2 - 25}px`};
  margin-left: ${`${width / 2 - 25}px`};
`;
export const ContainerAlreadyHaveCode = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
export const TextAlreadyHaveCode = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
export const FlowButtonContainer = styled(RectButton)`
  height: 60px;
  border-width: 1px;
  border-radius: 30px;
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
    border-color: ${props.theme.colors.tertiary};
    background-color: ${props.theme.colors.tertiary};
  `}
  justify-content: center;
  align-items: center;
  margin: 0 32px;
  margin-bottom: 16px;
`;
export const FlowTextButton = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
`;
