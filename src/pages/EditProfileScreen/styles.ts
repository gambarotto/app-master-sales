import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

const { statusBarHeight } = Constants;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: ${`${statusBarHeight + 24}px`};
  position: relative;
`;
export const Container = styled.ScrollView`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;
export const ContainerAvatar = styled.View`
  justify-content: center;
  align-items: center;
`;
export const ContainerAvatarImage = styled.View`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border-width: 2px;
`;
export const Avatar = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 75px;
  border-width: 1px;
`;
export const ButtonCamera = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 25px;
  ${(props) => css`
    background-color: ${props.theme.colors.black};
  `}
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin-top: -42px;
  margin-left: 100px;
`;
export const IconCamera = styled(MaterialIcons)``;
export const ContainerForm = styled.View`
  flex: 1;
  margin-top: 24px;
`;
export const TextFbLoginEmail = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
  text-align: center;
`;
export const ContainerActionsButtons = styled.View`
  flex: 1;
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
`;
export const ContainerChangePassword = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
export const TextChangePassword = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:12px;
  font-family: 'Roboto-Regular';
  margin-bottom: 16px;
`;
