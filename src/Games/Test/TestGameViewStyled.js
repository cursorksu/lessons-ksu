import styled from '@emotion/styled';
import {
  CREAM, ERROR_MAIN, ITEM_OUTER, NEON, SUCCESS
} from '../../constants/colors';

export const TestGameViewStyled = styled('div')`
  padding: 100px;
  min-width: calc(100% - 200px);
  height: 100vh;
  overflow: hidden;
  color: ${CREAM};
  position: relative;
  font-family: "Coco Gothic Alternate", sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F4884837.jpg?alt=media&token=8791a5e4-4444-4b0c-a23e-49a2b05c00dc");
  background-size: 33%;
  background-repeat: repeat;
  
  &::before,
  &::after {
    content: '';
    width: 80px;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2F4884837.jpg?alt=media&token=8791a5e4-4444-4b0c-a23e-49a2b05c00dc");
    background-size: 800%;
    background-repeat: repeat;
    box-shadow: 0 0 25px 25px #000407;
    z-index: 100;
  }
  
  &::after {
    right: 0;
    background-position: top left;
  }

  &::before {
    left: 0;
    background-position: top right;
  }
  .score {
    position: absolute;
    top: 40px;
    left: 200px;
  }

  .hints {
    position: absolute;
    top: 10px;
    right: 220px;
    height: 80px;
    overflow: hidden;
    background-position: center center;
    background-size: 300px;
    background-repeat: no-repeat;
    width: 320px;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2FLIFELINEs.png?alt=media&token=82eaaf69-d1f1-41b9-8c21-20da50ed15da");

    & > div {
        width: 94px;
        height: 58px;
        border-radius: 50%;
        position: absolute;
        top: 12px;
        z-index: 10;
      
      &:hover {
        box-shadow:
                  5px -5px 5px  rgba(0, 255, 255, 0.5),
                -5px 5px 5px rgba(130, 60, 166, 0.5),
                  5px -5px 5px  rgba(0, 255, 255, 0.5),
                -5px 5px 5px rgba(130, 66, 166, 0.5);
      }
      
      &.used {
        &:after,
        &:before {
          content: '';
          width: 8px;
          height: 80px;
          border-radius: 4px;
          background: ${ERROR_MAIN};
          position: absolute;
          top: -10px;
          left: 50%;
          transform: rotate(60deg);
        }
        
        &:before {
          transform: rotate(-60deg);
        }
      }
    }
    
    & > div:nth-of-type(1) {
      left: 8px;
    }
    & > div:nth-of-type(2) {
      left: 108px;
    }
    & > div:nth-of-type(3) {
      right: 8px;
    }
  }
  
  .ksu-slide {
    & > .mic {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      font-style: normal;
      
      .mic-content {
        font-family: "Coco Gothic Alternate", sans-serif;
      }
    }
    
    .start-slide {
      display: flex;
      width: 100%;
      height: calc(100vh - 200px);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      h1 {
        font-family: "Coco Gothic Alternate", sans-serif;
        font-size: 8rem;
        font-weight: 700;
        padding-bottom: 60px;
        text-shadow: ${NEON};
      }
      }
      
      img {
        width: 600px !important;
        height: 60vh !important;
        object-fit: contain !important;
      }
    }
    
  }
  
  .navigation {
    background-color: #053b69;
    box-shadow: 0 0 25px 25px #000407;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    margin-bottom: 100px;
  }
  
  .swiper {
    overflow: visible !important;
    
    .swiper-button-next,
    .swiper-button-prev {
      border-radius: 50%;
      box-shadow:
              inset 5px -5px 10px rgba(0, 255, 255, 0.5),
                inset -5px 5px 10px rgba(130, 60, 166, 0.5),
              inset 5px -5px 10px rgba(0, 255, 255, 0.5),
                inset -5px 5px 10px rgba(130, 66, 166, 0.5);
    }
    .swiper-button-next,
    .swiper-button-prev,
    .button-prev,
    .button-next {
      top: -50px !important;
      text-shadow: ${NEON};
    }
    .swiper-button-prev {
      left: 20px !important;
    }
    .button-prev {
      right: 20px !important;
    }
    .swiper-button-next {
      right: 20px !important;
    }
    .button-next {
      left: 20px !important;
    }
    
    .swiper-pagination.swiper-pagination-clickable {
      top: -70px;
      z-index: 800 !important;
      max-height: 70px;
    }

    .swiper-pagination-bullet {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      width: 40px !important;
      font-weight: 700;
      height: 40px !important;
      color:  #1a084e;
      background: #1a084e;
      box-shadow:
              inset 5px -5px 10px rgba(0, 255, 255, 0.5),
                inset -5px 5px 10px rgba(130, 60, 166, 0.5),
              inset 5px -5px 10px rgba(0, 255, 255, 0.5),
                inset -5px 5px 10px rgba(130, 66, 166, 0.5);

      &.swiper-pagination-bullet-active {
        background: #1a084e;
      }
    }
  }
  
  .question {
    color: #fff;
    font-family: "Coco Gothic Alternate", sans-serif;
    font-size: 4.5rem;
    margin: 40px 0 100px;
    
    .answer {
      height: auto;
      padding: 60px 30px 30px;
      margin: auto;
      position: relative;
      
      &::after,
      &::before {
        content: none;
      }
    }
  }
  
  .answer  {
    background-color: #053b69;
    border: 2px solid rgba(0, 255, 255, 0.5);
    box-shadow:
            inset 5px -5px 10px rgba(0, 255, 255, 0.5),
              inset -5px 5px 10px rgba(130, 60, 166, 0.5),
            inset 5px -5px 10px rgba(0, 255, 255, 0.5),
              inset -5px 5px 10px rgba(130, 66, 166, 0.5);
    width: 90%;
    height: 100px;
    border-radius: 50px;
    position: absolute;
    text-align: center;
    line-height: 100px;
    top: 52px;
    left: 40px;
    
    &:after,
    &:before {
      content: '';
      width: 9%;
      height: 2px;
      box-shadow: ${NEON};
      background: rgba(0, 255, 255, 1);
      position: absolute;
      top: 50%;
    }
    
    &:after {
      left: 100%;
    }
    &:before {
      right: 100%;
    }
  }
  .answer-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 130px 130px 130px 130px;
    grid-gap: 40px;
    padding: 0;
    margin: 0;
    overflow: visible;
    
    li {
      padding: 0;
      margin: 0;
      list-style-type: none;
      position: relative;
      min-height: 140px;
      overflow: visible;
      
      &.selected:not(.fact) {
        .answer {
          background: ${ERROR_MAIN};
          box-shadow: ${ITEM_OUTER};
        }
      }

      &.selected.fact {
        .answer {
          background: ${SUCCESS};
        }
      }
      
      &.fact {
        .answer {
          background-color: #fff;
          color: #1a084e;
          text-shadow:
                    5px -5px 50px rgba(0, 255, 255, 0.5),
                  -5px 5px 50px rgba(130, 60, 166, 0.5),
                    5px -5px 50px rgba(0, 255, 255, 0.5),
                  -5px 5px 50px rgba(130, 66, 166, 0.5);
        }
        &::before {
          content: "";
          position: absolute;
          top: 102px;
          left: 50%;
          width: 91%;
          height: 110px;
          transform: translate(-50%, -50%);
          border-radius: 50px;
          z-index: -1;
          box-shadow:
                    5px -5px 50px 5px rgba(0, 255, 255, 0.5),
                  -5px 5px 50px 5px rgba(130, 60, 166, 0.5),
                    5px -5px 50px 5px rgba(0, 255, 255, 0.5),
                  -5px 5px 50px 5px rgba(130, 66, 166, 0.5);
        }
      }
    }
  }
`;
