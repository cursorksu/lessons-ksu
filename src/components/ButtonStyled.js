import styled from '@emotion/styled';
import { BG_GRAY, ERROR_MAIN, PRIMARY_MAIN, TEXT_MAIN, TOMATO } from '../constants/colors';

export const ButtonStyled = styled('button')`
  color: #fff;
  background-color: ${ERROR_MAIN};
  margin: 0;
  padding: 10px 20px;
  font-weight: 300;
  text-transform: uppercase;
  max-height: 36px;
  transition: background-color 0.3s ease-in-out;
  border: none;
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
  margin: 0;

  svg {
    width: 20px;
    height: 20px;
  }

  &.row-action {
    background: transparent;
  }
`;

export const ButtonIconBasisStyled = styled('button')`
  cursor: pointer;
  width: 36px;
  flex-basis: 36px;
  min-width: initial;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  color: ${ERROR_MAIN}
  background: transparent;
  transition: color 3s linear;
  font-size: 40px;
  
  font-weight: 500;
  
  &:hover {
    background: transparent;
  }

  svg {
    width: 24px;
    height: 24px;
  }
  
  &.absolute-rite {
    position: absolute;
    right: 0px;
  }
`;
