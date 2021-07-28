import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  height: 100%;
  margin-top: ${`${statusBarHeight + 8}px`};
  padding: 16px;
  padding-top: 0;
`;
export const ContainerHeader = styled.View`
  padding: 16px;
  justify-content: center;
`;
export const ContainerImage = styled.View`
  width: 100%;
  align-items: center;
`;
export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
`;
export const ContainerDescription = styled.View`
  margin-top: 36px;
`;
export const Title = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const Description = styled.Text`
  margin-top: 16px;
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;
