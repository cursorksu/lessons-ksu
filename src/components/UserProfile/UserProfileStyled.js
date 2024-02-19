import styled from '@emotion/styled';
import { CREAM, CHOCO } from '../../constants/colors';

export const UserProfileStyled = styled.div`
  padding: 40px;
  display: flex;
  align-items: center;
  background-color: rgba(96,81,71,0.3);
  
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
`;