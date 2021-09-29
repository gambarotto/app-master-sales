import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  position: relative;
  flex: 1;
  margin-top: ${`${statusBarHeight + 16}px`};
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  padding-bottom: 16px;
`;

export const TextFirstStep = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  text-align: center;
`;
export const ContainerInputEmail = styled.View`
  height: 50px;
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  border-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
  justify-content: center;
  align-items: center;
`;
export const TextInputEmail = styled.TextInput`
  flex: 1;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
`;
export const IndicatorSendEmail = styled.ActivityIndicator`
  margin-top: 16px;
`;
export const TextSendingEmail = styled(Animated.Text)`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
  font-family: 'Roboto-Bold';
  margin-top: 8px;
`;
export const FlowButtonContainer = styled(RectButton)`
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
  margin-top: 32px;
`;
export const FlowTextButton = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
`;
export const ContainerAlreadyHaveCode = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  bottom: 0;
`;
export const TextAlreadyHaveCode = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
`;
