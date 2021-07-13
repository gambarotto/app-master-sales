import { MaterialIcons } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  margin: 0;
  ${(props) =>
    css`
      background-color: ${props.theme.colors.white};
    `}
`;
export const TitleModal = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;
export const ContainerQuantityAndButton = styled.View`
  flex-direction: row;
`;
export const ContainerQuantity = styled.View`
  flex-direction: row;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
`;
export const ContainerAction = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(MaterialIcons)``;
export const Quantity = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  margin-right: 12px;
  margin-left: 12px;
`;
export const ButtonConfirm = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  ${(props) =>
    css`
      background-color: ${props.theme.colors.secondary};
    `}
`;
export const TextButtonConfirm = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  ${(props) =>
    css`
      color: ${props.theme.colors.white};
    `}
`;
