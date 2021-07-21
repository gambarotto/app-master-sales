import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, TextButton } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  textSize?: number;
  styleContainer?: object;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  textSize = 24,
  styleContainer = {},
  ...rest
}) => (
  <Container style={styleContainer} color={color} {...rest}>
    <TextButton textSize={textSize}>{children}</TextButton>
  </Container>
);

export default Button;
