import styled from '@emotion/styled';

export const TestItemStyled = styled('div')`
  padding-top: 20px;
  display: grid;
  grid-template-areas:
    'question question'
    'answer0 answer1'
    'answer2 answer3'
    'answer4 answer5'
    'answer6 answer7'
    'answer8 answer9'

;
  grid-gap: 20px;
  
  .question {
    grid-area: question;
  }
  .answer:nth-child(0) {
    grid-area: answer0;
  }
  .answer:nth-child(1) {
    grid-area: answer1;
  }
  .answer:nth-child(2) {
    grid-area: answer2;
  }
  .answer:nth-child(3) {
    grid-area: answer3;
  }
  .answer:nth-child(4) {
    grid-area: answer4;
  }
  .answer:nth-child(5) {
    grid-area: answer5;
  }
  .answer:nth-child(6) {
    grid-area: answer6;
  }
  .answer:nth-child(7) {
    grid-area: answer7;
  }
  .answer:nth-child(8) {
    grid-area: answer8;
  }
  .answer:nth-child(9) {
    grid-area: answer9;
  }
  
  .answer, .question {
    display: grid;
    grid-template-columns: 1fr 60px 40px;
    grid-gap: 10px;
    align-items: center;
    position: relative;
    
    .input-label {
      font-size: 1.1rem;
      position: absolute;
      top: -20px;
    }
  }
`;
