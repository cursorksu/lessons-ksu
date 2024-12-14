import styled from '@emotion/styled';
import {
  BOX_SHADOW,
  CHOCO,
  CREAM,
  DARK_BG,
  GOLD,
} from '../../constants/colors';

export const TabStyled = styled('div')`
  padding: 40px;
  .card:hover {
    outline: ${CREAM} 4px solid;
  }
  & > div {
    & > .grid {
      padding: 0 40px;
    }
    .menu {
      padding: 0 40px;
      .item {
        color: ${GOLD} !important;
      }
    }
  }

  .menu .item {
    background: ${CREAM}  !important;
    border-radius: 4px 4px 0 0 !important;
    margin-right: 6px !important;
    opacity: 0.8 !important;
    transition: opacity 0.3s ease-in-out !important;
    font-size: 1.5rem !important;
    font-weight: 300 !important;
    font-family: Comfortaa, sans-serif !important;
    box-shadow: ${BOX_SHADOW};
    
    &:hover {
      opacity: 1 !important;
    }
    
    &.active {
      opacity: 1 !important;
      background: #fff !important;
      color: ${CHOCO};!important;
      position: relative;
      z-index: 2;
    }
    
    svg {
      width: 26px;
      height: 26px;
      display: inline;
      margin-right: 20px;
    }
  }
  
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
  
  .lesson-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    background: ${DARK_BG};
  }
`;
