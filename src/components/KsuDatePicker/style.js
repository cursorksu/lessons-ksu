import styled from '@emotion/styled';
import { PRIMARY_MAIN } from '../../constants/colors';

export const DatePickerStyled = styled('div')`
  min-width: 100%;
  
  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    display: block;
    width: 100% !important;
  }

  input {
    width: 100%;
    border-radius: 4px;
    padding: 5px 12px;
    border: 1px solid #a39367;
    height: 2.6rem;
    line-height: 2.6rem;
    display: block;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: ${PRIMARY_MAIN};

    &:focus-visible {
      outline: none;
    }
    
    &::placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 300;
      font-size: 16px;
    }
  }
`;
