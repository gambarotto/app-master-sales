import styled, { css } from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
  height: 300px;
`;

export const LineInputs = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonAddCard = styled.TouchableOpacity`
  flex: 1;
  height: 40px;
  max-width: 70px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  ${(props) =>
    css`
      background-color: ${props.theme.colors.secondary};
    `}
`;
export const TextButton = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.white};
    `}
  font-family: 'Roboto-Regular';
`;
