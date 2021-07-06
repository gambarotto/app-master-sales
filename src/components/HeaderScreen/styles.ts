import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ImageLogo = styled.Image`
  width: 170px;
  height: 50px;
`;
export const ContainerCart = styled.TouchableOpacity``;
export const IconCart = styled(MaterialIcons)`
  margin-left: 8px;
`;
