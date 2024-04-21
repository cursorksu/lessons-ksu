import styled from '@emotion/styled';
import {
  CHOCO, CREAM, DARK_BG, GOLD, ITEM_BG, ITEM_INNER, ITEM_OUTER, PRIMARY_MAIN
} from '../constants/colors';

export const ShadowCardStyled = styled('li')`
    box-shadow: ${ITEM_OUTER},
    inset 10px 10px 15px rgba(70, 70, 70, 0.12);
    position: relative;
    background: ${ITEM_BG};
    border-radius: 20px;
    list-style-type: none;
    padding: 30px;
    margin: 0;
    font-size: 3rem;
    color: ${PRIMARY_MAIN};
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 60px 1fr;
    align-items: center;

    &:after {
      border-radius: 20px;
      position: absolute;
      top: 6px;
      right: 6px;
      left: 6px;
      bottom: 6px;
      content: '';
      z-index: 1;
      box-shadow: ${ITEM_INNER};
    }

    &.active {
      background: rgba(163, 147, 103, 0.7) linear-gradient(transparent, rgba(255, 255, 255, 0.3));
      color: white;
    }

    .subtitle {
      font-size: 1.8rem;
      text-align: center;
      white-space: pre-wrap;
      color: ${CHOCO};
    }

    svg {
      display: block;
      width: 60px;
      height: 60px;
    }
  `;

export const MainContentStyled = styled('div')`
  position: relative;
  min-height: 100vh;
  
  .benefits {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 0;
    padding: 0;
    height: 724px;
    grid-template-rows: 1fr 1fr 1fr;
  }
  
  .ksu-content {
    margin: 40px;
    background: #fff;
    min-height: calc(100vh - 300px);
    border-radius: 4px;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    padding: 20px;
    
    .title {
      color: ${CHOCO};
      font-size: 2rem;
      font-family: Montserrat, sans-serif;
      font-weight: 300;
      padding-bottom: 30px;
      white-space: pre-wrap;
    }
    
    & > .aside-wrapper {
      flex-basis: 30%;
      position: relative;
      border-right: 1px solid ${PRIMARY_MAIN};
      padding-right: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      font-size: 1.5rem;
      
      iframe {
        width: 100%;
        height: 300px;
        border-radius: 4px;
      }

      .title {
        color: ${CHOCO};
        font-size: 2rem;
        font-family: Montserrat, sans-serif;
        font-weight: 300;
        padding-bottom: 30px;
        white-space: pre-wrap;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 10px;
          right: -50%;
          transform: translateX(-50%);
          background-image: linear-gradient(to right, transparent 0%, ${CHOCO} 50%, ${CHOCO} 50%, transparent 100%);
        }
      }
    }
    & > .content-wrapper {
      flex-basis: 70%;
      padding-left: 20px;
    }
  }
    
    .herro {
        width: 100%;
        height: 200px;
        position: relative;
        background-image: url("https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center -160px;
        text-align: center;
        color: ${CREAM};
      
        &.scenario-herro {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fshow.webp?alt=media&token=2df4fc9a-e478-4f44-ae60-c0639f61c537");
        }
        
        .title-wrapper {
            position: relative;
            z-index: 1;
        }
      .title {
        font-family: 'Nexa Script', sans-serif;
        font-size: 4rem;
        font-weight: 500;
        margin: 0 !important;
      }
      .subtitle {
        font-family: 'Nexa Script', sans-serif;
        font-size: 2rem;
        font-weight: 500;
        margin: 0 !important;
        padding-top: 20px;
        position: relative;
        overflow: visible;

        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -10px;
          right: -50%;
          transform: translateX(-50%);
          background-image: linear-gradient(to right, transparent 0%, ${CREAM} 50%, ${CREAM} 50%, transparent 100%);
        }
      }
      &:after {
        content: '';
        background: rgba(0, 0, 0, 0.4);
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
    font-size: 1.14rem;
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

    .middle {
      svg {
        width: 25px;
        height: 25px;
      }
    }
    
    .big {
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
  .collapsed-menu .ps-menu-button {
    color: #282c34 !important;
  }
  .collapsed-menu .ps-sidebar-root {
    background: #fff;
  }
  
  .pagination {
    margin-top: 40px;
    
    .activePage {
      background: ${PRIMARY_MAIN};
    }
  }
`;
