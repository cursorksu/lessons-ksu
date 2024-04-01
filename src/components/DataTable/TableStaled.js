import styled from '@emotion/styled';
import { BG_GOLD, ERROR_MAIN, SUCCESS } from '../../constants/colors';

export const TableStaled = styled.div`
  padding: 40px;
  font-size: 1.2rem;
  font-weight: 400;

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
