import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  color?: 'primary' | 'secondary' | 'tertiary';
}
export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #e94250;
  ${(props) =>
    css`
      background-color: ${props.theme.colors[props.color || 'primary']};
    `}
  margin-top: 16px;
`;
export const TextButton = styled.Text`
  color: #fff;
  font-size: 24px;
`;
