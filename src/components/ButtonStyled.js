import styled from '@emotion/styled';
import { BG_GRAY, PRIMARY_MAIN, TEXT_MAIN } from '../constants/colors';

export const ButtonStyled = styled('button')`
  color: #fff;
  background-color: rgb(96,81,71);
  margin: 2px;
  padding: 10px;
  font-weight: 300;
  text-transform: uppercase;
  max-height: 36px;
  transition: background-color 0.3s ease-in-out;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  min-width: 148px;

  span {
    white-space: nowrap;
    display: inline-block;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: ${PRIMARY_MAIN};
    border: none;
  }

  &.Mui-disabled {
    background: ${BG_GRAY};
    color: ${TEXT_MAIN};
  }
`;

export const ButtonIconStyled = styled(ButtonStyled)`
  width: 36px;
  flex-basis: 36px;
  min-width: initial;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  padding: 0;
  margin: 2px;

  svg {
    width: 20px;
    height: 20px;
    margin: 0;
  }

  &.row-action {
    background: transparent;
  }
`;