import styled from '@emotion/styled';
import { BG_GRAY, CHOCO, PRIMARY_MAIN, TEXT_MAIN, VEREM_GOLD } from '../constants/colors';

export const ButtonStyled = styled('button')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
  background-size: 200%;
  color: white;
  font-family: Comfortaa, sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 3s ease;

  &:hover {
    animation: slow-shine 3s infinite linear;
  }
  
  &:first-of-type {
    margin-right: 20px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  
  &:focus {
    outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при фокусе */
    outline-offset: 4px; /* Отступ для эстетичности */
  }

  &:active {
    outline: 2px solid ${VEREM_GOLD}; /* Золотистый outline при активации */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3); /* Эффект вдавливания */
  }

  @keyframes slow-shine {
    0% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 0% 0%;
    }
    100% {
      background-color: linear-gradient(90deg, #f0c674, ${VEREM_GOLD}, ${VEREM_GOLD}, #f0c674);
      background-position: 200% 200%;
    }
  }
`;

export const ButtonIconStyled = styled(ButtonStyled)`
  padding: 0;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  
  svg {
    margin: 0;
  }
  
  &:hover {
    animation: slow-shine 2s infinite linear;
  }
`;
