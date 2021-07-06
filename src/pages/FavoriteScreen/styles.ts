import Constants from 'expo-constants';
import styled from 'styled-components/native';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  flex: 1;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
export const ContainerHeader = styled.View`
  padding: 16px;
`;
