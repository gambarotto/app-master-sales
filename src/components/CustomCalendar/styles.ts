import styled, { css } from 'styled-components/native';

interface DayProps {
  disable: boolean | undefined;
  selected: boolean;
}
interface ILabel {
  color: string;
}

export const Container = styled.View``;
export const ContainerCalendar = styled.View`
  border-width: 0.5px;
  ${(props) =>
    css`
      border-color: ${props.theme.colors.gray4};
    `};
  width: 100%;
`;
export const ContainerDayCalendar = styled.TouchableOpacity<DayProps>`
  justify-content: center;
  align-items: center;
  ${(props) =>
    css`
      background-color: ${props.selected
        ? props.theme.colors.tertiary
        : props.theme.colors.white};
    `};
`;
export const TextDay = styled.Text<DayProps>`
  ${(props) =>
    css`
      color: ${props.disable
        ? props.theme.colors.gray4
        : props.theme.colors.gray1};
    `};
  font-family: 'Roboto-Regular';
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;
export const ContainerLabels = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const ContainerLabel = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const IndicatorColor = styled.View<ILabel>`
  width: 6px;
  height: 6px;
  border-radius: 4px;
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `};
  margin-right: 8px;
`;
export const TextLabel = styled.Text`
  ${(props) =>
    css`
      color: ${props.theme.colors.gray3};
    `};
  font-family: 'Roboto-Regular';
  font-size: 12px;
`;
