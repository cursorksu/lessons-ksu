import styled from '@emotion/styled';
import { CREAM } from '../../constants/colors';

export const LessonListStyled = styled('div')`
  & > .grid {
    margin: 0;
    padding: 20px;
  }
  
  .cards-grid {
    width: 320px !important;
    padding-bottom: 30px !important;
  }
  
  .card:hover {
    outline: ${CREAM} 4px solid;
  }
`;
