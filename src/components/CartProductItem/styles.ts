import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 50px;
  margin-top: 4px;
  flex-direction: row;
`;
export const ContainerProductImage = styled.View`
  height: 100%;
  width: 65px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const ProductImage = styled.Image`
  height: 100%;
  width: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const ContainerProductData = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
export const NameProduct = styled.Text`
  position: absolute;
  width: 65%;
  left: 8px;
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.gray2};
  `}
`;
export const ContainerQuantity = styled.View`
  width: 50px;
  height: 40px;
  border-width: 1px;
  border-radius: 4px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray3};
  `};
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;
export const TextQuantity = styled.Text`
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.gray2};
  `}
`;
export const TotalProduct = styled.Text`
  width: 70px;
  font-family: 'Roboto-Regular';
  font-size: 12px;
  ${(props) => css`
    color: ${props.theme.colors.red};
  `};
  text-align: right;
`;
