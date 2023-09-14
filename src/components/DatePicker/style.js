import styled from "@emotion/styled";
import { FormControl } from "@mui/material";
import { BORDER_GRAY } from "../../constants/colors";

export const DatePickerStyled = styled(FormControl)`
  min-width: 100%;
  margin-top: 10px;

  .MuiFormHelperText-root {
    margin: 0;
  }

  input {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${BORDER_GRAY};
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    box-shadow: none;

    &:focus-visible {
      outline: none;
    }
  }

  .title {
    color: white;
    font-size: 20px;
    display: block;
    font-weight: 700;
    margin: 20px auto;
  }
`;
