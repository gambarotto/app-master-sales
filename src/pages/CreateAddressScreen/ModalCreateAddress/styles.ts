import styled, { css } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  width: 90%;
  height: 50%;
  border-radius: 8px;
  padding: 8px;
  background-color: white;
  z-index: 5;
  align-self: center;
  margin-top: 16px;
`;
export const ContainerInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(MaterialIcons)`
  margin-bottom: 36px;
`;
export const TextDescription = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
`;

export const ButtonOk = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  ${(props) => css`
    background-color: ${props.theme.colors.secondary};
  `}
  justify-content: center;
  align-items: center;
`;
export const TextButton = styled.Text`
  color: white;
  font-weight: bold;
`;
