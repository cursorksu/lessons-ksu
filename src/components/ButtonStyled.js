import { Button } from "@mui/material";
import styled from "@emotion/styled";
import {
  BG_GRAY,
  BORDER_GRAY,
  PRIMARY_MAIN,
  TEXT_MAIN,
} from "../constants/colors";
import { Link } from "react-router-dom";

export const ButtonStyled = styled(Button)`
  color: #fff;
  background-color: tomato;
  margin: 0;
  padding: 8px 20px;
  font-weight: 600;
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
  cursor: pointer;
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

  &.not-current-lang {
    background: ${BORDER_GRAY};
  }

  &.row-action {
    background: transparent;
  }
`;

export const ButtonIconBasisStyled = styled(Button)`
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
  color: ${PRIMARY_MAIN}
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

export const ButtonStyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: #fff;
  background-color: tomato;
  border-radius: 4px;
  margin: 0;
  padding: 8px 20px;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out;
  border: none;

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

export const ButtonIconBigStyled = styled(ButtonIconStyled)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ButtonIconEndStyled = styled(ButtonStyled)`
  span {
    margin-right: 20px;
  }
`;
