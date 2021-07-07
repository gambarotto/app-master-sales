import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  margin-top: ${`${statusBarHeight + 12}px`};
  padding-left: 16px;
  padding-right: 16px;
`;
export const ContainerUserData = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
`;
export const ContainerAvatar = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;
export const Avatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;
export const ContainerUserInfo = styled.View`
  padding-left: 8px;
`;
export const TextNameUser = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #000;
`;
export const TextEmailUser = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
`;
export const ContainerMenu = styled.View`
  flex: 1;
  margin-top: 30px;
`;
export const ContainerItemMenu = styled.TouchableOpacity`
  flex-direction: row;
  height: 52px;
  align-items: center;
`;
export const IconItemMenu = styled(MaterialIcons)`
  margin-right: 8px;
`;
export const TextItemMenu = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
`;
