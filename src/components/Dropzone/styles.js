import styled from '@emotion/styled';
import { PRIMARY_MAIN, BG_GOLD } from '../../constants/colors';
import { Grid } from 'semantic-ui-react';

export const StyledDropzoneBody = styled(Grid)`
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 8px;
  
  .dz-row {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
  
  &.ui.grid {
    margin: -5px !important;
  }
  .column {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  
  .size-box {
    margin-left: 15px !important;
    text-align: center;
  }
  .image {
    color: #abaaa8;
    
    &.active {
      color: ${PRIMARY_MAIN};
    }
  }

  label {
    padding-left: 5px !important;
    background: transparent;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6) !important;
    display: inline-block;
    
    &:before {
      content: none !important;
    }
    &:after {
      content: none !important;
    }
  }
`;

export const UvDropzoneStyled = styled('section')`
  background: ${BG_GOLD};
  border: 1px dashed ${PRIMARY_MAIN};
  border-radius: 4px;
  height: 200px;
  width: 200px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  [role="presentation"],
  .accent {
    height: 200px;
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
    height: 200px;
    object-fit: cover;
  }
`;
