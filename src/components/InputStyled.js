import { TextArea } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { BG_GOLD, CHOCO, CREAM, PRIMARY_MAIN, VEREM_GOLD } from '../constants/colors';

export const FormStyled = styled.div`
  margin: 10px 0;
`;
export const LabelStyled = styled.label`
    color: ${VEREM_GOLD};
    margin-bottom: 8px;
    padding: 0;
    background: transparent;
    font-family: Comfortaa, sans-serif;
    font-weight: 600;
    font-size: 14px;
    display: block;
    &.inline {
      display: inline-block;
    }
`;
export const InputFieldStyled = styled.div`
  width: 100%;
  display: block;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${VEREM_GOLD};
  margin-bottom: 10px;

  .label,
  label {
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const InputStyled = styled.input`
  width: 100%;
  border-radius: 40px;
  padding: 5px 12px;
  border: 1px solid ${VEREM_GOLD};
  height: 40px;
  line-height: 40px;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: ${CHOCO};

  &:focus {
    border: 1px solid ${VEREM_GOLD};
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px; 
  }
`;

export const TextareaAutosizeStyled = styled(TextArea)`
  border: 1px solid ${PRIMARY_MAIN};
  resize: vertical;
  cursor: pointer;
  font-family: Comfortaa, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
  min-height: 270px;
  color: ${CHOCO};
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  display: block;
  width: 100%;

  &:focus,
  &:focus-visible {
    border: 1px solid ${VEREM_GOLD};
    outline: 2px solid ${VEREM_GOLD};
    outline-offset: 4px;
  }
`;
