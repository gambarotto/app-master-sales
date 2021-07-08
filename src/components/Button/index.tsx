import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, TextButton } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  textSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  textSize = 24,
  ...rest
}) => (
  <Container color={color} {...rest}>
    <TextButton textSize={textSize}>{children}</TextButton>
  </Container>
);

export default Button;
