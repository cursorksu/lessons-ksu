import styled from '@emotion/styled';
import { CREAM, DARK_BG } from '../../constants/colors';

export const TabStyled = styled('div')`
  .card:hover {
    outline: ${CREAM} 4px solid;
  }
  & > div {
    & > .grid {
      padding: 0 40px;
    }
    .menu {
      padding: 0 40px;
      background: ${DARK_BG} !important;
    }
  }

  .menu .item svg {
    width: 26px;
    height: 26px;
    display: inline;
    margin-right: 20px;
  }
  
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
  
  .lesson-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    background: ${DARK_BG};
  }
`;
