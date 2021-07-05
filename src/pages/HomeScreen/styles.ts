import styled, { css } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';

const { statusBarHeight } = Constants;

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${`${statusBarHeight + 12}px`};
  justify-content: flex-start;
`;
export const ContainerHeader = styled.View`
  padding: 16px;
`;
export const ContainerImageAndCart = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
`;
export const ContainerCart = styled(RectButton)``;
export const IconCart = styled(MaterialIcons)`
  margin-left: 8px;
`;
export const ContainerSearch = styled.View`
  flex-direction: row;
  ${(props) => css`
    background-color: ${props.theme.colors.gray4};
  `}
  height:50px;
  border-radius: 25px;
  margin-top: 16px;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;
export const IconSearch = styled(MaterialIcons)`
  margin-right: 8px;
`;
export const InputSearch = styled.TextInput`
  flex: 1;
`;
