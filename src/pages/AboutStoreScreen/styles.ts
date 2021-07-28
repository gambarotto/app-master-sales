import Constants from 'expo-constants';
import { Dimensions, FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IPhotoStore } from '.';

const { statusBarHeight } = Constants;
const widthItem = Dimensions.get('screen').width / 3;

export const Container = styled.View`
  flex: 1;
  height: 100%;
  margin-top: ${`${statusBarHeight + 8}px`};
  padding: 16px;
  padding-top: 0;
`;
export const ContainerHeader = styled.View`
  padding: 16px;
  justify-content: center;
`;
export const ContainerImage = styled.View`
  width: 100%;
  align-items: center;
`;
export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
`;
export const ContainerDescription = styled.View``;
export const Title = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:18px;
  font-family: 'Roboto-Bold';
  margin-bottom: 8px;
`;
export const Description = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:14px;
  font-family: 'Roboto-Regular';
  margin-bottom: 8px;
`;
export const ContainerGallery = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
export const PhotosList = styled(FlatList as new () => FlatList<IPhotoStore>)``;
export const ContainerItem = styled.TouchableOpacity`
  height: ${`${widthItem - 16}px`};
  width: ${`${widthItem - 16}px`};
  margin: 1px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PhotoItem = styled.Image`
  /* flex-basis: 0; */
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
