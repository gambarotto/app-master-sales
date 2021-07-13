import styled from 'styled-components/native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const Container = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  margin-top: ${`${statusBarHeight + 8}px`};
`;
