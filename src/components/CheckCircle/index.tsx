import React from 'react';

import { Container, InsideCircle } from './styles';

interface Props {
  isChecked: boolean;
  size?: number;
}

const CheckCircle: React.FC<Props> = ({ isChecked, size = 24 }) => (
  <Container isChecked={isChecked} size={size}>
    <InsideCircle isChecked={isChecked} size={size} />
  </Container>
);

export default CheckCircle;
