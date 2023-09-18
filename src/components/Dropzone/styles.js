import styled from '@emotion/styled';
import { PRIMARY_MAIN, BG_GOLD } from '../../constants/colors';

export const StyledDropzoneBody = styled('div')`
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 8px;
`;

export const UvDropzoneStyled = styled('section')`
  background: ${BG_GOLD};
  border: 1px dashed ${PRIMARY_MAIN};
  border-radius: 4px;
  height: 130px;
  width: 200px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  [role="presentation"],
  .accent {
    height: 130px;
    width: 200px;
    cursor: pointer;
    background: transparent;
    display: flex;
    font-size: 1.2rem;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${PRIMARY_MAIN};
  } 

  img {
    width: 200px;
    height: 150px;
    object-fit: cover;
  }
`;
