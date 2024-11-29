import styled from '@emotion/styled';
import { BG_GOLD, PRIMARY_MAIN, TEXT_MAIN } from '../../constants/colors';

export const StyledDropdown = styled('div')`
  min-width: 100%;
  position: relative;
  border-radius: 4px;
  
  .ui.top.right.pointing.dropdown > .menu {
    width: 300px;
    color: ${TEXT_MAIN};
    min-width: 50% !important;
  }

  .ui.dropdown .menu .item .image, 
  .ui.dropdown .menu .item img, 
  .ui.dropdown .text .image, 
  .ui.dropdown .text img {
    margin-top: 0;
    margin-bottom: 0;
    min-width: 40px;
    min-height: 40px;
  }
  
  input {
    border: none;
  }
  .dropdown {
    font-weight: 300;
    font-size: 1.5rem;
    
    .text {
      color: ${PRIMARY_MAIN};
      font-weight: 300;
      font-size: 1.2rem;
    }
    
    & > .text {
      width: 100%;
      line-height: 40px;
      
      & > * {
        display: inline-block;
      }
      
      .avatar {
        min-width: 40px !important;
        max-width: 40px !important;
        width: 40px !important;
        height: 40px !important;
      }
    }
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
  
  .ui.multiple.dropdown > .label {
    box-shadow: none;
  }
  
  .ui.selection.active.dropdown .menu,
  .ui.selection.active.dropdown {
    box-shadow: none;
    border: 1px solid ${PRIMARY_MAIN};
    border-bottom-right-radius: 4px !important;
    border-bottom-left-radius: 4px !important;
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
  
  .dropdown.selection {
    width: 100%;
    border-radius: 4px;
    padding: 5px 32px 5px 5px;
    border: 1px solid #a39367;
    min-height: 40px;
    line-height: 40px;
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
      padding-left: 20px;
    }

    .text {
      padding: 0 0 0 10px;
    }
    
    .ksu-option {
      overflow: hidden;
      line-height: 1.5;
      
      .description {
        color: ${PRIMARY_MAIN};
        font-weight: 300;
        font-size: 1.2rem;
      }

      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    a:after {
      content: none !important;
    }
    .label {
      max-width: 260px;
      display: inline-block !important;
      padding-right: 30px;

      &:after {
        content: none;
      }
    }
  }
`;
