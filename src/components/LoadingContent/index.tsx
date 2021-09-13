import React from 'react';

import { Container, ActivityIndicator, TextLoading } from './styles';
import themeGlobal from '../../styles/global';

interface Props {
  showIndicator?: boolean;
  sizeIndicator?: number;
  sizeTextLoading?: number;
  textLoading?: string;
  colorIndicator?: 'primary' | 'secondary' | 'tertiary';
  colorText?: 'primary' | 'secondary' | 'tertiary';
}

const LoadingContent: React.FC<Props> = ({
  showIndicator = true,
  sizeIndicator = 20,
  sizeTextLoading = 12,
  textLoading,
  colorIndicator = 'secondary',
  colorText = 'secondary',
}) => (
  <Container>
    {showIndicator && (
      <ActivityIndicator
        color={themeGlobal.colors[colorIndicator]}
        size={sizeIndicator}
      />
    )}
    {textLoading && (
      <TextLoading color={colorText} size={sizeTextLoading}>
        {textLoading}
      </TextLoading>
    )}
  </Container>
);
export default LoadingContent;
