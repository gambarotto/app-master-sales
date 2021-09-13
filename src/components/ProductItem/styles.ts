import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

export const ContainerAnimated = styled(MotiView)``;
export const Container = styled.TouchableOpacity`
  height: 80px;
  border-radius: 8px;
  flex-direction: row;
  margin-bottom: 2px;
  border-width: 1px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray4};
  `}
`;
export const ContainerImage = styled.View`
  width: 120px;
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
  flex: 1;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
`;
export const TitleProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.secondary};
  `}
  font-size:12px;
  font-family: 'Roboto-Bold';
`;

export const DescriptionProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:10px;
  font-family: 'Roboto-Regular';
`;
export const PriceProduct = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.tertiary};
  `}
  font-size:12px;
  font-family: 'Roboto-Medium';
`;
