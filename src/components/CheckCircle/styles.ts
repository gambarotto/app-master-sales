import styled, { css } from 'styled-components/native';

interface IProps {
  isChecked: boolean;
  size: number;
}

export const Container = styled.View<IProps>`
  border-width: 1px;
  ${(props) => css`
    height: ${`${props.size}px`};
    width: ${`${props.size}px`};
    border-radius: ${`${props.size / 2}px`};
    border-color: ${props.isChecked
      ? props.theme.colors.secondary
      : props.theme.colors.gray3};
  `}
  justify-content: center;
  align-items: center;
`;
export const InsideCircle = styled.View<IProps>`
  ${(props) => css`
    height: ${`${props.size - props.size * 0.2}px`};
    width: ${`${props.size - props.size * 0.2}px`};
    border-radius: ${`${props.size / 2}px`};
    background-color: ${props.isChecked
      ? props.theme.colors.secondary
      : props.theme.colors.white2};
  `}
`;
