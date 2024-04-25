import { TextArea } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { BG_GOLD, CREAM, PRIMARY_MAIN } from '../constants/colors';

export const LabelStyled = styled.label`
  &.label {
    padding: 0;
    background: transparent;
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    
    &.inline {
      display: inline-block;
    }
  }
`;
export const InputFieldStyled = styled.div`
  width: 100%;
  display: block;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: ${PRIMARY_MAIN};

  .label,
  label {
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const InputStyled = styled.input`
    width: 100%;
    border-radius: 4px;
    padding: 5px 12px;
    border: 1px solid ${PRIMARY_MAIN};
    height: 40px;
    line-height: 40px;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    color: ${PRIMARY_MAIN};

    &:focus {
      outline: none;
      border: 1px solid ${PRIMARY_MAIN};
      background-color: ${CREAM};
    }
`;

export const TextareaAutosizeStyled = styled(TextArea)`
  border: 1px solid ${PRIMARY_MAIN};
  resize: none;
  transition:
    border-color,
    0.3s ease-in-out;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${PRIMARY_MAIN};
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 4px;
  padding: 5px 12px;
  display: block;
  width: 100%;

  &:focus,
  &:focus-visible {
    border-color: ${PRIMARY_MAIN};
    background-color: ${BG_GOLD};
    outline: none;
  }
`;
