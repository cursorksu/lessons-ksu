import styled from '@emotion/styled';
import { CREAM, DARK_BG, GOLD } from '../constants/colors';

export const MainContentStyled = styled('div')`
  position: relative;
  min-height: 100vh;
    
    .herro {
        width: 100%;
        height: 200px;
        position: relative;
        background-size: cover;
        text-align: center;
        color: ${CREAM};
        
        .title-wrapper {
            position: relative;
            z-index: 1;
        }
        
        &:after {
            content: '';
            background: rgba(0,0,0,0.6);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
        }
        
    }
  
  .collections-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 40px;
  }
  
  .topic-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    background: ${DARK_BG};
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
  
  .ps-menuitem-root.disabled {
    opacity: 0.3;
    color: white;
    pointer-events: none;
    display: none;
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
