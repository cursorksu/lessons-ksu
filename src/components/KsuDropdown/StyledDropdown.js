import styled from '@emotion/styled';
import { BG_GOLD, PRIMARY_MAIN } from '../../constants/colors';

export const StyledDropdown = styled('div')`
  min-width: 100%;
  position: relative;
  
  input {
    border: none;
  }
  
  .dropdown.icon {
    position: absolute;
    top: 50%;
    right: 5px;
    display: inline-block;
    width: 20px;
    height: 20px;
    color: ${PRIMARY_MAIN};
    z-index: 10;

    svg {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    
  }
  .dropdown .menu > .item {
    display: grid;
    grid-template-columns: 40px auto;
    grid-gap: 10px;
  }
  .ui.multiple.dropdown > .label {
    box-shadow: none;
  }
  .ui.selection.active.dropdown .menu,
  .ui.selection.active.dropdown {
    box-shadow: none;
    border: 1px solid ${PRIMARY_MAIN};
  }
  .ui.label {
    border: 1px solid ${PRIMARY_MAIN};
    background-color: ${BG_GOLD};
    width: 80%;
    position: relative;
    transition: background-color .3s ease-in-out;
    display: inline-grid !important;
    grid-template-columns: 40px auto;
    grid-gap: 10px;
    padding-right: 15px;
    box-shadow: none;
    
    .ksu-option {
      color: ${PRIMARY_MAIN};
      font-weight: 300;
      font-size: 1.5rem;
    }
    
    .description {
      display: none;
    }
  
    &:hover {
      border: 1px solid ${PRIMARY_MAIN};
      background-color: transparent;
    }
    
    .icon {
      position: absolute;
      top: 5px;
      right: 5px;
      color: ${PRIMARY_MAIN};
      width: 20px;
      height: 20px;
    }
  }

  .ksu-option {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.5;
    .description {
      color: ${PRIMARY_MAIN};
      font-weight: 300;
      font-size: 1.2rem;
    }
  }
  
  .dropdown.selection {
    width: 100%;
    border-radius: 4px;
    padding: 5px 32px 5px 5px;
    border: 1px solid #a39367;
    min-height: 2.6rem;
    line-height: 2.6rem;
    display: block;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: ${PRIMARY_MAIN};

    &:hover {
      border-color: ${PRIMARY_MAIN};
      box-shadow: none;
      transition: background-color .3s ease-in-out;
    }
    &:focus-visible {
      outline: none;
      border: 1px solid ${PRIMARY_MAIN};
    }
    
    &::placeholder {
      font-family: Montserrat, sans-serif;
      font-weight: 300;
      font-size: 16px;
    }
  }
`;
