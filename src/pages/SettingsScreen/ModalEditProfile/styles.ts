import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
  height: 50%;
  border-radius: 8px;
  background-color: white;
  align-self: center;
`;
export const ContainerHeader = styled.View`
  height: 80px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* justify-content: center; */
  /* align-items: center; */
  padding: 16px;
  ${(props) => css`
    background-color: ${props.theme.colors.secondary};
  `};
  margin-bottom: -25px;
`;
export const TextHeader = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Bold';
  ${(props) => css`
    color: ${props.theme.colors.white2};
  `}
`;
export const ContainerBody = styled.View`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
  z-index: 5;
`;
export const ContainerTextChangePassword = styled.TouchableOpacity`
  flex: 1;
  max-height: 40px;
  justify-content: center;
  align-items: center;
`;
export const TextChangePassword = styled.Text`
  font-size: 12px;
  font-family: 'Roboto-Regular';
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
`;
export const ContainerButtons = styled.View`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  flex: 1;
  flex-direction: row;
  padding: 0 16px;
  margin-top: 16px;
`;
export const ButtonBack = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
export const TextButton = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-family: 'Roboto-Regular'
`;
