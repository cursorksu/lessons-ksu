import styled from '@emotion/styled';
import { NEON, NEON_HOVER } from '../../constants/colors';
export const BoxesTextLink = styled('button')`
  cursor: pointer;
  background-color: #053b69;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fboxes(2).png?alt=media&token=305ce8fe-624d-4944-b88a-ed7cb66935ec');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 10px  center;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-right: 20px;
  border: none;
`;

export const GameScoreStyled = styled('section')`
  background-color: #053b69;
  width: ${({ isMenuCollapsed }) => `calc(100% - ${isMenuCollapsed ? 80 : 250}px)`};
  box-shadow: 0 0 25px 25px #000407;
  position: absolute;
  top: 0;
  left: ${({ isMenuCollapsed }) => isMenuCollapsed ? 80 : 250 + 'px'};
  right: 0;
  height: 100px;
  margin-bottom: 100px;
  color: #fff;
  transition: width 0.3s linear, left 0.3s linear;

  .score {
    text-align: center;
    font-size: 60px;
    font-family: "Coco Gothic Alternate", sans-serif;
  }
  
  .quote {
    position: absolute;
    left: 40px;
    top: 40px;
    font-size: 40px;
    font-family: "Coco Gothic Alternate", sans-serif;
    font-weight: 600;
  }
  
  .reload-button {
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 40px;
    box-shadow: ${NEON};
    transition: box-shadow 0.3s ease-in-out;
    
    &:hover {
      box-shadow: ${NEON_HOVER};
    }
    
    svg {
      width: 80px;
      height: 80px;
    }
  }
  `;

export const BoxesSettingsStyled = styled('section')`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 40px;
  
  .test-question {
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-gap: 40px;
    align-items: end;
  }
  `;

export const BoxesStyled = styled('section')`
  padding-top: 150px;
  background: #083752;
  
  .question-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style-type: none;
    padding: 20px 40px;
    margin: 0;
  }
  
  li > .question-item {
    background-repeat: no-repeat;
    width: 270px;
    height: 280px;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fboxes.jpg?alt=media&token=771af45e-70b1-4c30-8ecf-be0449cbaf7c');
    background-position: left center;
    background-size: calc(270px * 4);
    position: relative;

    .show {
      position: absolute;
      top: -40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
      z-index: 200;
    }
  }
  
  .empty {
    min-height: 74px;
    min-width: 200px;
    position: relative;
    
    &:after {
      content: '.....';
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
  }
  
  .answer-group-bible-tex {
    white-space: pre-wrap;
    padding: 40px;
    height: 30vh;
    text-align: center;
    position: relative;
    background: rgba(0,0,0,0.4);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      border-top: 1px solid rgba(0, 255, 255, 0.5);
      box-shadow: ${NEON_HOVER};
    }
  }
  .question-group {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    white-space: pre-wrap;
    padding: 160px 40px 40px;
    height: 70vh;
    text-align: left;
  }
`;
