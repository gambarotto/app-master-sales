import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  color?: 'primary' | 'secondary' | 'tertiary';
}
interface TextProps {
  textSize: number;
}
export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  flex: 1;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  ${(props) =>
    css`
      background-color: ${props.theme.colors[props.color || 'primary']};
    `}
`;
export const TextButton = styled.Text<TextProps>`
  color: #fff;
  ${(props) => css`
    font-size: ${`${props.textSize || 24}px`};
  `}
  font-family: 'Roboto-Regular';
`;
