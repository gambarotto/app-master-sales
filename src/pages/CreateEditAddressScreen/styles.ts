import { css } from 'styled-components';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { statusBarHeight } = Constants;
const heightDevice = Dimensions.get('window').height;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  position: relative;
  flex: 1;
  padding: 0 16px;
`;
export const Container = styled.ScrollView`
  height: ${`${heightDevice}px`};
  margin: 0px;
  margin-top: ${`${statusBarHeight + 16}px`};
  position: relative;
`;
export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
`;
export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
`;
export const Icon = styled(MaterialIcons)``;
export const TitleAdresses = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
`;

export const ContainerForm = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 24px;
`;
export const ContainerDoubleInputs = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;
export const ContainerButtons = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 16px;
  left: 16px;
`;
export const DeleteAddressButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  ${(props) => css`
    background-color: ${props.theme.colors.primary};
  `}
  margin-right: 16px;
`;
