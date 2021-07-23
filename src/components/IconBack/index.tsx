import React from 'react';
import { Container, Icon } from './styles';
import themeGlobal from '../../styles/global';

interface IconProps {
  positionAbsolute?: boolean;
  background?: boolean;
  backgroundColor?: string;
  iconColor?: 'primary' | 'secondary' | 'tertiary';
  styleElement?: object;
  onPress: () => any;
}

const IconBack: React.FC<IconProps> = ({
  positionAbsolute = true,
  background = false,
  backgroundColor = themeGlobal.colors.white,
  iconColor = 'secondary',
  styleElement = {},
  ...rest
}) => (
  <Container
    style={styleElement}
    positionAbsolute={positionAbsolute}
    background={background}
    backgroundColor={backgroundColor}
    {...rest}
  >
    <Icon
      name="keyboard-arrow-left"
      size={24}
      color={themeGlobal.colors[iconColor]}
    />
  </Container>
);

export default IconBack;
