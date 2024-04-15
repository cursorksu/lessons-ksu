import styled from '@emotion/styled';

export const ChurchStyled = styled('div')`
  max-width: 70%;
  margin: 40px auto;
  
  .ksu-button {
    position: static;
  }

  .pastor-avatar {
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
