import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${(props) => css`
    background-color: ${props.theme.colors.white};
  `}
`;
export const ImageStore = styled.Image`
  height: 100%;
  width: 100%;
`;
