import React from 'react';
import { Container, ImageLogo } from './styles';
import logo from '../../assets/logo_catarina.png';

const SplashScreen: React.FC = () => (
  <Container>
    <ImageLogo source={logo} />
  </Container>
);

export default SplashScreen;
