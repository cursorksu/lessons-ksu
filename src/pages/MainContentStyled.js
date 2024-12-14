import styled from '@emotion/styled';
import {
    BOX_SHADOW,
    BOX_SHADOW_HOVER,
    CHOCO,
    CREAM,
    DARK_BG,
    GOLD,
    ITEM_BG,
    ITEM_INNER,
    ITEM_OUTER,
    PRIMARY_MAIN,
    VEREM_CREAM_BG, VEREM_GOLD,
    VEREM_TEXT,
} from '../constants/colors';

export const ShadowCardStyled = styled('li')`
  box-shadow:
    ${ITEM_OUTER},
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

  &.in-aside {
    margin-bottom: 20px;
  }

  &.d-block {
    display: block;

    svg {
      width: 20px;
      height: 20px;
    }
  }

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
    background: rgba(163, 147, 103, 0.7)
      linear-gradient(transparent, rgba(255, 255, 255, 0.3));
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

  .no-margin {
    margin: 0 !important;
  }

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
    border: 1px solid ${VEREM_GOLD};
    min-height: calc(100vh - 300px);
    border-radius: 4px;
    display: grid;
    grid-template-columns: 35% 1fr;
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

      &.d-block {
        display: block;
      }

      .ui.card {
        border: none;
        padding: 0;
        border-radius: 0;
        outline: none;

        &:hover {
          outline: none;
        }
      }

      .game-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
        text-align: center;

        .subtitle {
          text-align: center;
          font-size: 20px;
        }
      }

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
        padding-bottom: 20px;
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
          background-image: linear-gradient(
            to right,
            transparent 0%,
            ${CHOCO} 50%,
            ${CHOCO} 50%,
            transparent 100%
          );
        }
      }
    }
    & > .content-wrapper {
      overflow: hidden;
      padding-left: 20px;

      .d-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .herro {
    width: 100%;
    height: 200px;
    position: relative;
    background-image: url('https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    text-align: center;
    color: ${CREAM};
    box-shadow: ${BOX_SHADOW};

    &.scenario-herro {
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fshow.webp?alt=media&token=2df4fc9a-e478-4f44-ae60-c0639f61c537');
      background-position: center -160px;
    }

    &.collection-herro {
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpixlr-image-generator-e835cbe4-3908-4f0c-9d40-916dc0cccff5.jpg?alt=media&token=3ac4b81d-2975-48b2-a33a-0740871357fb');
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
        background-image: linear-gradient(
          to right,
          transparent 0%,
          ${CREAM} 50%,
          ${CREAM} 50%,
          transparent 100%
        );
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
    margin-left: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
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
    transition:
      color 0.3s ease,
      background-color 0.3s ease;
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
    box-shadow: ${BOX_SHADOW_HOVER};

    .active {
      background: rgba(255, 255, 255, 0.7);
      color: ${CHOCO} !important;
    }

    li ul li {
      a {
        padding: 0 0 0 50px;
      }
      &.active {
        background: #fff;
      }
    }

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

  [data-popper-escaped] .ps-menu-button {
    padding: 0 10px;
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

  .question-wrapper {
    margin-bottom: 20px;
  }

  .game {
    overflow: visible;
    flex-basis: 130px;
    border-right: 1px solid ${PRIMARY_MAIN};
  }

  .game-item {
    cursor: pointer;
    background: rgba(163, 147, 103, 0.5)
      linear-gradient(transparent, rgba(255, 255, 255, 0.8));
    padding: 10px 0 10px 11px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 1px solid transparent;
    border-right: 0 solid transparent;
    margin-bottom: 5px;

    &.active {
      background: #fff;
      border: 1px solid ${GOLD};
      border-right: 0 solid transparent;
      margin-right: -2px;
    }

    .subtitle {
      white-space: pre-wrap;
      text-align: center;
    }
  }

  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 10px;
  }
`;

export const VeremMainContentStyled = styled('div')`
  position: relative;
  min-height: 100vh;

  .main-content {
    margin-left: ${({ collapsed }) => (collapsed ? '80px' : '250px')};
    transition: margin-left 0.2s ease-in-out;
  }

  .hero {
    width: 100%;
    text-align: center;
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
    box-shadow: ${BOX_SHADOW_HOVER};

    .active {
      background: rgba(255, 255, 255, 0.7);
      color: ${CHOCO} !important;
    }

    li ul li {
      a {
        padding: 0 0 0 50px;
      }
      &.active {
        background: #fff;
      }
    }

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
    transition:
      color 0.3s ease,
      background-color 0.3s ease;
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

  [data-popper-escaped] .ps-menu-button {
    padding: 0 10px;
  }
  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 10px;
  }
  .contacts {
      margin: 0;
      padding: 0;
      
    li {
      line-height: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;

      span {
        font-weight: 700;
        display: block;
        margin-right: 10px;
      }
    }
  }
  .church-avatar {
    width: 100%;
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: -150px;
      left: 70px;
      transform: translate(-50%, 0) rotate(-130deg);
      width: 270px;
      height: 270px;
      z-index: 100;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Frise.png?alt=media&token=364431b2-8bb9-480f-a945-31ca01c9b764');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .img {
      width: 100%;
      height: 400px;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: brightness(0.7);
    }
    
    .full-screen {
        .img{
          height: 100vh;
          filter: none;
        }
    }
  }
  .content-block {
    margin-bottom: 40px;
  }
  
  .content-block-placeholder {
    margin-bottom: 40px;
    padding: 40px;
    height: 400px;
    border: 1px solid ${VEREM_GOLD};
    font-size: 30px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #a39367;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .verem-church-title {
    position: relative;
    z-index: 0;
    top: 0;
    text-align: center;
    display: grid;
    grid-template-columns: 15% 1fr 60px;
    width: 60%;
    margin: auto;

    .title-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .title {
      font-family: "Yeseva One", serif;
      font-size: 36px;
      margin: 0 !important;
      line-height: 1.5;
      letter-spacing: 2px;
    }

    .subtitle {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      white-space: nowrap;
      margin-bottom: 0;
    }

    .logo {
      padding: 20px;
      width: 160px;
      height: auto;
    }
    
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
