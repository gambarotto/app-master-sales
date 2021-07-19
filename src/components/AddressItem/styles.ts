import { MaterialIcons } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface SelectedAddress {
  isSelected?: boolean;
}

export const Container = styled.View<SelectedAddress>`
  flex-direction: row;
  border-width: 1px;
  border-radius: 4px;
  ${(props) => css`
    border-color: ${props.isSelected
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
  margin-bottom:8px;
`;
export const ContainerData = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
`;
export const AliasAddress = styled.Text<SelectedAddress>`
  font-family: 'Roboto-Bold';
  font-size: 14px;
  ${(props) => css`
    color: ${props.isSelected
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
  margin-bottom:8px;
`;
export const TextAddressDescription = styled.Text<SelectedAddress>`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) => css`
    color: ${props.isSelected
      ? props.theme.colors.gray2
      : props.theme.colors.gray3};
  `}
`;
export const ContainerEdit = styled.TouchableOpacity`
  width: 60px;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(MaterialIcons)``;

export const TextEdit = styled.Text<SelectedAddress>`
  font-family: 'Roboto-Regular';
  font-size: 10px;
  ${(props) => css`
    color: ${props.isSelected
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
`;
