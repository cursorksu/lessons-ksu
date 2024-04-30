import styled from '@emotion/styled';
import { DARK_GRAY } from '../../constants/colors';

export const LessonListStyled = styled('div')`
  & > .grid {
    margin: 0;
    padding: 20px;
  }
  
  .cards-grid {
    width: 24% !important;
    padding-bottom: 30px !important;
    
    .content {
      padding-bottom: 0;
    }
    
    .description {
      text-align: center;
      img {
        display: none
      }
    }
    .description,
    .title.card-title,
    .quote {
      color: ${DARK_GRAY}
    } 
  }
  

`;
