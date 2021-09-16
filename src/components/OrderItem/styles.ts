import { MotiView } from 'moti';
import styled, { css } from 'styled-components/native';

export const ContainerAnimated = styled(MotiView)``;
export const Container = styled.TouchableOpacity`
  height: 125px;
  max-height: 125px;
  padding: 8px;
  border-radius: 8px;
  border-width: 0.5px;
  ${(props) => css`
    border-color: ${props.theme.colors.gray4};
    background-color: ${props.theme.colors.white};
  `}
  margin-bottom: 4px;
`;
export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;
export const TitleDate = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.primary};
  `}
  font-size:12px;
  font-family: 'Roboto-Bold';
`;
export const SubTitleDate = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray3};
  `}
  font-size:10px;
  font-family: 'Roboto-Regular';
  margin-left: 8px;
`;
export const TextOrderNumber = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:10px;
  font-family: 'Roboto-Bold';
  margin-bottom: 4px;
`;
export const LineText = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const TextDescription = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:10px;
  font-family: 'Roboto-Regular';
  margin-bottom: 4px;
`;
export const TextCurrency = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:10px;
  font-family: 'Roboto-Regular';
  margin-bottom: 4px;
`;
export const TextTotal = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:11px;
  font-family: 'Roboto-Bold';
`;
export const TextTotalCurrency = styled.Text`
  ${(props) => css`
    color: ${props.theme.colors.gray1};
  `}
  font-size:11px;
  font-family: 'Roboto-Bold';
`;
