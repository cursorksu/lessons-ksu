import styled from '@emotion/styled';
import {
  BG_GOLD, CHOCO, CREAM, GOLD, PRIMARY_MAIN,
} from '../constants/colors';

export const InfoItemStyled = styled.div`
  border-radius: 4px;
  border: 1px solid ${CREAM};
  margin-bottom: 10px;
  padding: 7px 32px 7px 7px;
  color: ${CREAM};
  position: relative;
  
  button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }
`;

export const InfoBlockStyled = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.5;
width: 100%;
  overflow: auto;

  .img-wrapper {
    width: 100px;
    height: 100px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      border-radius: 20px;
    }

    img {
      border-radius: 20px;
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
  }

  .button-wrapper {
    margin: 10px 0 20px;
  }

  b {
    font-weight: 600;
  }

  a {
    text-align: left;
    font-size: 1.5rem;
    color: ${PRIMARY_MAIN};
    padding-bottom: 3px;
    transition: color 0.3s ease-in-out;
    position: relative;

    &:hover {
      color: ${CHOCO};

      &::after {
        background-color: ${CHOCO};
      }
    }

    &:after {
      transition: background-color 0.3s ease-in-out;
      content: '';
      width: 100%;
      height: 1px;
      background: ${PRIMARY_MAIN};
      position: absolute;
      bottom: 3px;
      left: 0;
      right: 0;
    }
  }

  ul {
    color: ${CHOCO};
    list-style-type: none;
    text-align: left;
    font-size: 1.2rem;
    line-height: 1.8;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
    }
  }

  .contacts {
    position: relative;
    z-index: 2;

    li {
      display: grid;
      grid-template-columns: 80px 1fr;
      grid-gap: 10px;
      align-items: start;
    }

    a {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;

      &:after {
        content: none;
      }
    }

    address {
      white-space: pre-wrap;
      font-style: normal;
      font-weight: 400;
      font-size: 1.5rem;
    }
  }

  .ui.card {
    box-shadow: none;
  }

  .content-wrapper {
    position: relative;

    .field {
      margin-bottom: 10px;
    }
  }

  .quill {
    position: sticky;
  }

  .action {
    margin: 0 0 20px 0;
  }

  .action,
  .ql-toolbar.ql-snow {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;
    background: #fff !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 100;

    &:after {
      content: '';
      left: 0;
      right: 0;
      top: 2px;
      height: 45px;
      border-radius: 4px;
      background: ${BG_GOLD};
      position: absolute;
      z-index: -10;
    }
  }

  .ql-toolbar.ql-snow {
    top: 45px;
  }

  &.aside-wrapper > li {
    display: block !important;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::after {
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

  .image-wrapper {
    height: 300px;
    margin-bottom: 30px;
    position: relative;

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    button {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    &.full-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200 !important;
      width: 100%;
      height: 100vh;

      img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }

    }
  }

  .groups-card-lis,
  .vertical-card-lis {
    .vertical-card {
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      min-width: 280px;
      text-align: center;
      padding: 240px 20px 20px;
      min-height: 460px;
      font-size: 2rem;
      font-family: Montserrat, sans-serif;
      font-weight: 300;
      display: block;

      &.group {
        padding: 70px 20px 20px;
      }
      h2 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      li {
        font-size: 16px !important;
        line-height: 1.8 !important;

        button {
          border-radius: 50%;
          width: 20px;
          height: 20px;

          svg {
            width: 14px;
            height: 14px;
          }
        }
      }

      img {
        width: 100%;
        height: 260px;
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        z-index: 0;
      }
    }

    button {
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 2;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    a {
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }

  .groups-card-lis {
    grid-template-columns: repeat(2, 520px);
  }

  .church-avatar {
    border-radius: 4px;
    overflow: hidden;
    height: 280px;
    margin-bottom: 20px;

    img {
      margin-right: 0 !important;
      width: 100%;
      height: 280px;
      object-fit: cover;
      object-position: center;
    }
  }

  .item-action {
    padding: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${GOLD};
  }
  
  .material-list {
    position: relative;
    
    .ui.checkbox label {
      font-size: 20px;
      line-height: 2;
      white-space: pre-wrap;
      
      &:before {
        width: 30px;
        height: 30px;
        border-color: ${GOLD};
        top: 10px;
      }
      
      &:after {
        color: ${GOLD};
        font-size: 20px;
        top: 5px;
        left: 5px;
      }
    }

    .ui.checkbox input:checked:focus~label:before,
    .ui.checkbox input:checked:focus~label:after {
      border-color: ${BG_GOLD};
      color: ${BG_GOLD};
    }
  }

  .lesson-title {
    min-height: 40px !important;
    font-family: 'Nexa Script', sans-serif !important;
    font-weight: 700 !important;
    font-size: 3rem !important;
  }
  
  .image-placeholder {
    height: 300px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fplaceholder2.jpg?alt=media&token=e524e66b-1da1-4e89-bf19-b6ddcbc949a1");
    border-radius: 4px;
  }
`;
