import styled from '@emotion/styled';
import { BG_GOLD, DARK_GRAY } from '../../constants/colors';
export const KsuCardStyled = styled('div')`
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${DARK_GRAY};
  position: relative;
  min-height: 100px;
  box-shadow: none;

  .header h3 {
    font-family: 'Nexa Script', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 0 !important;
  }
  
  .card-actions {
    margin: 20px 0;
    padding: 5px;
    background: ${BG_GOLD};
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .action-top {
    position: absolute;
    top: 0;
    right: 0;
    
    & > div {
      padding: 0;
    }
  }
`;
