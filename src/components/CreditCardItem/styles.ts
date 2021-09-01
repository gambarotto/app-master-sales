import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  max-height: 40px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;

  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `}
`;
export const Brand = styled.Image`
  height: 20px;
  width: 35px;
  margin-left: 8px;
`;
export const LastNumbersCard = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  margin-left: 8px;
`;
