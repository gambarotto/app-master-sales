import { MotiView } from 'moti';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ICreditCard } from '..';

export const ContainerModal = styled.View`
  flex: 1;
`;
export const Container = styled(MotiView)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;
export const ContainerModalContent = styled(MotiView)`
  height: 50%;
  width: 100%;
  justify-content: flex-end;
  background-color: white;
  padding: 16px;
`;
export const KeybordAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;
export const TextModal = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  font-family: 'Roboto-Bold';
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;
export const CardList = styled(FlatList as new () => FlatList<ICreditCard>)``;
export const ContainerAddCreditCard = styled.TouchableOpacity`
  height: 40px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;
export const TextAddNewCreditCard = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.gray1};
    `};
  font-family: 'Roboto-Regular';
  margin-top: 24px;
  margin-bottom: 8px;
`;
export const ButtonConfirm = styled.TouchableOpacity`
  height: 60px;
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
  font-family: 'Roboto-Bold';
`;
export const ContainerNewCard = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
  flex-direction:row;
  align-items: center;
`;
export const NewCardNumber = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.gray1};
    `};
  font-family: 'Roboto-Bold';
  margin-left: 8px;
`;
