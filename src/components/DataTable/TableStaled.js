import styled from '@emotion/styled';
import { BG_GOLD, CREAM, ERROR_MAIN, SUCCESS } from '../../constants/colors';

export const TableStaled = styled.div`
  padding: 0 40px 40px;
  font-family: Montserrat, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  td {
    vertical-align: center;
  }
  .slider.checkbox label {
    display: block;
    margin: auto;
  }
  .slider.checkbox label:after {
    background: ${ERROR_MAIN} linear-gradient(transparent,rgba(255,255,255,.5)) !important;
  }
  tr {
    position: relative;
  }
  tr:after {
    content: '';
    position: absolute;
    top: 0;
    left: 100px;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255, 0.7);
  }
  .ui.celled.definition.table thead:not(.full-width) th:first-child {
    background: ${CREAM} !important;
    color: rgba(0, 0, 0, .87) !important;
    font-weight: 600;
    box-shadow: none;
    
  }
  thead, tfoot {
    font-size: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    th {
      background: ${CREAM} !important;
      color: rgba(0, 0, 0, .87) !important;
      font-weight: 400;
    }
  }
  thead tr:after,
  tr.is-active:after {
    content: none;
  }
  .ui.table tr.active  {
    background: ${BG_GOLD} linear-gradient(transparent,rgba(255,255,255,.5)) !important;
  }
  .is-active {
    .slider.checkbox label:after {
      background: ${SUCCESS} linear-gradient(transparent,rgba(255,255,255,.5)) !important;
    }
  }
  
  .d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 0;
    }
  }
`;
