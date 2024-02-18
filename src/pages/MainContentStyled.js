import styled from '@emotion/styled';
import { CREAM, GOLD } from '../constants/colors';

export const MainContentStyled = styled('div')`
  position: relative;
  min-height: 100vh;
  
  .button-wrapper {
    padding: 40px;
  }
  
  .topic-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 40px;
  }

  .title {
    font-family: 'Nexa Script', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    margin: 0 !important;
  }

  .card {
    width: 100%;
    color: white;
  }
  
  .main-content {
    margin-left: ${({ collapsed }) => collapsed ? '80px' : '250px'};
    transition: margin-left 0.2s ease-in-out;
  }

  .ps-submenu-expand-icon,
  .ps-menu-icon {
    color: ${GOLD};
  }
  .ps-menu-button:hover {
    background-color: white !important;
    transition: color 0.3s ease, background-color 0.3s ease;
  }
  
  .ps-menu-root {
    .divider {
      margin: 0;
    }
  }
  .ps-menu-root ul {
    display: flex;
    min-height: 100vh;
    justify-content: space-between;
    flex-direction: column;
    background: ${CREAM};
    border-color: transparent;
  }
  .ps-menu-root .ps-submenu-content ul {
    min-height: initial;
  }
  
  .collapsed-menu {
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
    
    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
    }
  }
  .collapsed-menu .ps-menu-button {
    color: #282c34 !important;
  }
  .collapsed-menu .ps-sidebar-root {
    background: #fff;
  }
`;
