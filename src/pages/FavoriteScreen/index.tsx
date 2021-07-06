import React from 'react';

import { Container, ContainerHeader } from './styles';
import HeaderScreen from '../../components/HeaderScreen';

const FavoriteScreen: React.FC = () => (
  <Container>
    <ContainerHeader>
      <HeaderScreen />
    </ContainerHeader>
  </Container>
);

export default FavoriteScreen;
