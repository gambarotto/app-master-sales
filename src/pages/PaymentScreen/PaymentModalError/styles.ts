import { MotiView } from 'moti';
import styled from 'styled-components/native';

export const ContainerModal = styled.View`
  flex: 1;
`;
export const Container = styled(MotiView)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
export const ContainerModalContent = styled(MotiView)`
  height: 50%;
  width: 80%;
  border-radius: 16px;
  justify-content: flex-end;
  background-color: white;
  padding: 16px;
`;
