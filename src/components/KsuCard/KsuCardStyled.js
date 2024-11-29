import styled from '@emotion/styled';
import { BG_GOLD, DARK_GRAY } from '../../constants/colors';
export const KsuCardStyled = styled('div')`
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${DARK_GRAY};
  position: relative;
  min-height: 100px;
  padding: 8px;
  border: 1px solid ${BG_GOLD};
  box-shadow: none !important;
  background: linear-gradient(to bottom, rgba(163, 147, 103, 0), rgba(163, 147, 103, 0.3));

  .header h3 {
    font-family: 'Nexa Script', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 0 !important;
  }
  
  .card-actions {
    margin: 20px 0 0 0;
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
