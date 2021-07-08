import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from 'styled-components';

export const ButtonFacebookLogin = styled(RectButton)`
  /* flex: 1;
  height: 50px; */
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: #459ef8;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Icon = styled(MaterialIcons)`
  margin-right: 8px;
`;
export const TextFacebookButton = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  font-weight: bold;
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
`;
