import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

export const ContainerModal = styled.View`
  flex: 1;
`;
export const Container = styled(MotiView)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;
export const ContainerModalContent = styled(MotiView)`
  position: relative;
  height: 80%;
  width: 100%;
  /* justify-content: space-between; */
  background-color: white;
  padding: 16px;
`;
export const TitleModal = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.secondary};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;
export const ContainerCalendar = styled.View`
  margin-bottom: 32px;
  justify-content: center;

  flex: 1;
`;
export const ContainerButton = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  ${(props) =>
    css`
      background-color: ${props.theme.colors.secondary};
    `};
`;
export const TextButton = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.white};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
`;
