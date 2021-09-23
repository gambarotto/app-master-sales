import { MaterialIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

export const ContainerModal = styled.View`
  flex: 1;
`;
export const Container = styled(MotiView)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
export const ContainerModalContent = styled(MotiView)`
  height: 40%;
  width: 70%;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 16px;
`;
export const Icon = styled(MaterialIcons)``;
export const TextError = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size: 14px;
  font-family: 'Roboto-Regular';
  margin-top: 8px;
  text-align: center;
`;
export const ContainerButton = styled.View`
  height: 50px;
  width: 100%;
`;
export const ButtonConfirm = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  ${(props) => css`
    background-color: ${props.theme.colors.secondary};
  `}
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
export const TextButton = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.white};
    `};
  font-family: 'Roboto-Regular';
  font-size: 16px;
`;
