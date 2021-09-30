import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  margin: 0px;
`;
export const ContainerLogo = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
  /* margin-bottom: 36px; */
`;
export const Logo = styled.Image`
  width: 200px;
  height: 180px;
`;
export const ContainerLogin = styled.View`
  flex: 1;
  margin-top: 24px;
  justify-content: space-between;
`;
export const ContainerCreateAccount = styled.TouchableOpacity`
  align-items: center;
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
export const TextOr = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.primary};
    `}
  font-size: 16px;
  font-family: 'Roboto-Regular';
  margin-top: 12px;
  text-align: center;
`;
export const ContainerLoginWithSocialMedia = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 12px;
`;
