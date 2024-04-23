import styled from '@emotion/styled';
import { CREAM, CHOCO, DARK_BG } from '../../constants/colors';

export const UserProfileStyled = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fpreview%20(10).webp?alt=media&token=a22a2da8-1821-4366-805a-6fce2bf456f8");
  background-position: center -80px;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;

  .title {
    color: ${CREAM};
    font-family: 'Nexa Script', sans-serif;
    font-size: 4rem;
    font-weight: 500;
    margin: 0 !important;
  }
  .subtitle {
    color: ${CREAM};
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
  
  .info {
    width: 60%;
    margin: auto;
    color: #000;
    font-family: Montserrat, sans-serif;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
  }

  .tabular.menu {
    padding: 40px 40px 0;
    border-bottom: none;
    max-width: calc(100% - 80px);
    overflow-y: hidden;
    overflow-x: auto;
    
    .item {
      background: white;
      font-family: Montserrat, sans-serif;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      font-size: 1.5em;
      font-weight: 300;
      margin-right: 5px;
      box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.4);
      opacity: 0.8;
      transition: opacity 0.3s ease-in-out;

      &.active {
        background: ${CREAM};
        box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.4);
        opacity: 1;
      }
      
      &:hover {
        background: ${CREAM};
       
      }
    }
  }
  
  .avatar {
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 40px;
    
    img {
      margin-right: 0 !important;
      width: 160px;
      height: 160px;
      object-fit: cover;
      object-position: center;
    }
  }

  .top-container {
      padding: 40px;
      background-color: ${DARK_BG};
  }
  
  .score {
    min-width: 60px;
    font-family: "Coco Gothic Alternate", sans-serif;
    font-size: 18px;
    color: rgb(96, 81, 71);
  }

  .d-flex {
      display: flex;
      align-items: center;
  }

  img {
      margin-right: 40px;
      border: 1px solid ${CREAM};
  }

  .meta {
      font-family: "Coco Gothic Alternate", sans-serif;
      font-size: 18px;
      color: ${CHOCO};
      font-weight: 400;
  }
  
  .estimation {
      border: none;
      display: flex;
      align-items: center;
      height: 40px;
      h4 {
          margin: 0;
      }
      img {
          margin: 0;
          border: none;
          width: 46px;
          height: 46px;
          object-fit: contain;
      }
  }
`;
export const ChurchHeroStyled = styled.div`
  .avatar {
    position: absolute;
    left: 0;
    top: 0;
    width: 60%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    
    img {
      margin-right: 0 !important;
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: center;
    }
  }

  .top-container {
      height: 300px;
      background-color: ${CHOCO};
      position: relative;
      overflow: hidden;
      padding: 40px 40px 40px 0;
      
      &:after {
        content: '';
        width: 1000px;
        height: 800px;
        border-radius: 50%;
        background-color: ${CHOCO};
        position: absolute;
        top: -80px;
        right: 8%;
        z-index: 1;
      }

      &:before {
        content: '';
        width: 1000px;
        height: 800px;
        border-radius: 50%;
        background-color: ${CREAM};
        position: absolute;
        top: -60px;
        right: 10%;
        z-index: 1;
      }
    
    .title {
      text-align: right;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      z-index: 2;
      color: ${CREAM};
      
      &:after {
        content: '';
        width: 500px;
        height: 1px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: linear-gradient(to right, transparent 0%, ${CREAM} 100%);
      }
    }
    .actions {
      width: 600px;
      padding: 10px;
      position: absolute;
      bottom: 0;
      right: 0;
      min-height: 50px;
      
      .button-wrapper {
        right: 10px;
        bottom: 10px;
        position: absolute;
      }
    }
    &.scenario {
      .meta {
        font-family: Montserrat, sans-serif;
        font-size: 1.5em;
        font-weight: 300;
        position: relative;
        z-index: 2;
        margin: 20px 0;
        color: ${CREAM};
        
        p {
          margin: 0;
          text-align: right;
        }
      }
    }
  }
`;
