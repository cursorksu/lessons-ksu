import { Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';
import { BG_GRAY, PRIMARY_MAIN, TEXT_MAIN, TOMATO } from '../constants/colors';

export const ButtonStyled = styled(MuiButton)`
  color: #fff;
  background-color: tomato;
  margin: 0;
  padding: 8px 20px;
  font-weight: 600;
  max-height: 36px;
  transition: background-color 0.3s ease-in-out;
  border: none;
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

export const ButtonIconBasisStyled = styled(MuiButton)`
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
  color: ${TOMATO}
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
