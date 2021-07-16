import styled, { css } from 'styled-components/native';

interface SelectedAddress {
  isSelected?: boolean;
}

export const Container = styled.View<SelectedAddress>`
  padding: 16px;
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
