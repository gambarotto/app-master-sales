import { css } from 'styled-components';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  margin: 0px;
`;

export const ContainerLogo = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${`${statusBarHeight + 16}px`};
  /* margin-bottom: 36px; */
`;
export const Logo = styled.Image`
  width: 190px;
  height: 170px;
`;
export const ContainerForm = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const TextCreateAccount = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `}
  font-size: 12px;
  font-family: 'Roboto-Regular';
  margin-top: 12px;
`;

export const ContainerOr = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;
export const TextOr = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `}
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin-top: 12px;
`;
export const ContainerLoginWithSocialMedia = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 12px;
`;

export const ContainerTextBack = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const TextBack = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `}
  font-size: 12px;
  font-family: 'Roboto-Regular';
  margin-top: 12px;
`;
