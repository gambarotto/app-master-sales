import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, TextButton } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => (
  <Container color={color} {...rest}>
    <TextButton>{children}</TextButton>
  </Container>
);

export default Button;
