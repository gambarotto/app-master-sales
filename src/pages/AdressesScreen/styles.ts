import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IAddress } from '../../contexts/auth';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  padding: 16px;
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
export const ButtonAdd = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
`;
export const ContainerAdressesList = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;
export const AdressesList = styled(FlatList as new () => FlatList<IAddress>)``;
export const ContainerButton = styled.View`
  height: 92px;
  width: 100%;
  padding: 16px;
`;
