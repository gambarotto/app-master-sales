import { MaterialIcons } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  position: relative;
`;
export const ContainerBadge = styled.View`
  position: absolute;
  right: 0px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border-width: 0.7px;
  ${(props) => css`
    background-color: ${props.theme.colors.red};
    border-color: ${props.theme.colors.white};
  `}
  z-index: 5;
  justify-content: center;
  align-items: center;
`;
export const TextBadge = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
  font-size:6px;
`;
export const IconCart = styled(MaterialIcons)`
  margin-left: 8px;
`;
