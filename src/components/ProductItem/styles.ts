import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 90px;
  border-radius: 8px;
  flex-direction: row;
  margin-bottom: 2px;
`;
export const ContainerImage = styled.View`
  width: 120px;
  height: 90px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;
export const ImageProduct = styled.Image`
  height: 100%;
  width: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;
export const ContainerInfo = styled.View`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;
export const TitleProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:14px;
  font-weight: bold;
`;

export const DescriptionProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:12px;
`;
export const PriceProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  font-size:14px;
`;
