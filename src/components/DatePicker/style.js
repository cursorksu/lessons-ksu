import styled from '@emotion/styled';
import { BORDER_GRAY } from '../../constants/colors';

export const DatePickerStyled = styled('input')`
  min-width: 100%;
  margin-top: 10px;
  
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
