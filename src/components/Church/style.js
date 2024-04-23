import styled from '@emotion/styled';

export const ChurchStyled = styled('div')`
  max-width: 70%;
  margin: 40px auto;
  
  .ksu-button {
    position: static;
  }
  .d-grid {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-gap: 2%;
  }
  .d-flex {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    gap: 20px;
    
    & > div {
      flex-basis: 50%;
    }
  }
`;
