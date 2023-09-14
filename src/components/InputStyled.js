import { TextareaAutosize, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { BORDER_GRAY, PRIMARY_MAIN_RGBA } from "../constants/colors";

export const InputFieldStyled = styled.div`
  width: 100%;
  display: block;

  .MuiInputBase-root {
    width: 100%;
  }

  .label,
  label {
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }

  input {
    display: block;
    box-sizing: border-box;
  }
`;

export const InputStyled = styled(TextField)`
  display: block;
  width: 100%;

  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid transparent;
    transition:
      border-color,
      0.3s ease-in-out;
  }

  .MuiInputLabel-root {
    top: -8px;

    &.Mui-focused {
      left: -12px;
    }
  }

  input {
    width: 100%;
    color: ${BORDER_GRAY};
    border-radius: 4px;
    padding: 5px 10px;
    border: 1px solid ${BORDER_GRAY};
    height: 2rem;
    line-height: 2rem;
  }
`;

export const InputContrastStyled = styled(TextField)`
  width: 100%;
  display: block;
  font-family: Montserrat, sans-serif;
  box-shadow: none;
  border: none;

  .MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .Mui-focused {
    border-color: transparent !important;
    background-color: transparent;
    outline: 2px solid transparent;

    & input {
      border-color: transparent !important;
    }
  }
  .MuiInputLabel-root {
    top: -10px;
    left: -12px;
  }
  .MuiInputLabel-root.Mui-focused {
    color: rgba(0, 0, 0, 0.6);
    border-color: transparent;
    outline: none;
    left: -12px;
  }
  .MuiInputLabel-root:not(.MuiFormLabel-filled) {
    left: 0;
    &.Mui-focused {
      left: -12px;
    }
  }
  legend {
    display: none;
  }
  textarea,
  input {
    cursor: pointer;
    font-weight: 300;
    background-color: transparent;
    border-radius: 4px;
    padding: 5px 10px;
    border: 1px solid ${BORDER_GRAY};

    &:focus {
      outline: 2px solid ${PRIMARY_MAIN_RGBA};
    }
  }
`;

export const TextareaAutosizeStyled = styled(TextareaAutosize)`
  border: 1px solid ${BORDER_GRAY};
  transition:
    border-color,
    0.3s ease-in-out;
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 4px;
  padding: 8px;
  display: block;
  width: 100%;
  min-height: 5rem !important;

  &:focus,
  &:focus-visible {
    border-color: transparent;
    outline: 2px solid ${PRIMARY_MAIN_RGBA} !important;
  }
`;
