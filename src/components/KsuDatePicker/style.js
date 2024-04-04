import styled from '@emotion/styled';
import { PRIMARY_MAIN } from '../../constants/colors';

export const DatePickerStyled = styled('div')`
  min-width: 100%;
  position: relative;
  
  .icon {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    display: inline-block;
    width: 20px;
    height: 20px;
    color: ${PRIMARY_MAIN};
    z-index: 10;
    
    svg {
      display: inline-block;
      width: 100%;
      height: 20px;
    }
    
  }
  
  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    display: block;
    width: 100% !important;
  }

  input {
    width: 100%;
    border-radius: 4px;
    padding: 5px 12px 5px 32px;
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
