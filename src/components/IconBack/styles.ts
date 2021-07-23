import { MaterialIcons } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface ElementProps {
  positionAbsolute: boolean;
  background: boolean;
  backgroundColor: string;
}
export const Container = styled.TouchableOpacity<ElementProps>`
  height: 40px;
  width: 40px;
  border-radius: 8px;
  ${(props) =>
    props.background &&
    css`
      background-color: ${props.backgroundColor};
    `}
  ${(props) =>
    props.positionAbsolute &&
    css`
      position: absolute;
    `}
  justify-content: center;
  align-items: center;
  /* left: 16px; */
  z-index: 5;
`;
export const Icon = styled(MaterialIcons)``;
