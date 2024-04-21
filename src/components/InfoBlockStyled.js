import styled from '@emotion/styled';
import {
  CHOCO, CREAM, PRIMARY_MAIN,
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
  margin: 20px 0;
  
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

  .vertical-card-lis {
    display: grid;
    grid-template-columns: repeat(4, 260px);
    grid-gap: 10px;
    padding: 0 0 40px;
    position: relative;
    
    .vertical-card {
      text-align: center;
      padding:  240px 20px 20px;
      min-height: 460px;
      font-size: 2rem;
      font-family: Montserrat, sans-serif;
      font-weight: 300;
      display: block;
      
      &.group {
        padding: 70px 20px 20px;
      }
      li {
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
        position: absolute;
        left: 6px;
        top: 6px;
        bottom: 6px;
        width: 248px;
        object-fit: cover;
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
`;