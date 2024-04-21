import styled from '@emotion/styled';
import { CREAM, CHOCO, DARK_BG } from '../../constants/colors';

export const UserProfileStyled = styled.div`
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
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
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
