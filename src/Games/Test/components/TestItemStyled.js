import styled from '@emotion/styled';

export const TestItemStyled = styled('div')`
  padding-top: 20px;
  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-template-areas:
    'question question'
    'answer0 answer1'
    'answer2 answer3'
    'answer4 answer5'
    'answer6 answer7'
  ;

  grid-gap: 20px;
  
  .test-question {
    grid-area: question;
  }
  .test-answer:nth-of-type(0) {
    grid-area: answer0;
  }
  .test-answer:nth-of-type(1) {
    grid-area: answer1;
  }
  .test-answer:nth-of-type(2) {
    grid-area: answer2;
  }
  .test-answer:nth-of-type(3) {
    grid-area: answer3;
  }
  .test-answer:nth-of-type(4) {
    grid-area: answer4;
  }
  .test-answer:nth-of-type(5) {
    grid-area: answer5;
  }
  .test-answer:nth-of-type(6) {
    grid-area: answer6;
  }
  .test-answer:nth-of-type(7) {
    grid-area: answer7;
  }
  input,
  .remove-handle {
    z-index: 2;
    position: relative;
    font-size: 1.5rem;
  }
  .test-answer, .test-question {
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

export const TestTextStyled = styled('ul')`
  list-style-type: none;
  font-family: "Coco Gothic Alternate", sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  
  ul {
    padding: 20px 0;
    display: grid;
    justify-content: stretch;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px; 
    list-style-type: none;
    margin: 20px 0;

    li {
      display: grid;
      justify-content: stretch;
      align-items: center;
      grid-template-columns: 20px 1fr;
      grid-gap: 10px;
    };
  }
  
  .test-text-question {
    font-weight: 600;
  }
`;
