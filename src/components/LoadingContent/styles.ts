import styled, { css } from 'styled-components/native';

interface PropsText {
  size: number;
  color: 'primary' | 'secondary' | 'tertiary';
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ActivityIndicator = styled.ActivityIndicator``;
export const TextLoading = styled.Text<PropsText>`
  ${(props) => css`
    color: ${props.theme.colors[props.color]};
    font-size: ${`${props.size}px`};
  `}
  font-family: 'Roboto-Regular';
  margin-top: 16px;
`;
