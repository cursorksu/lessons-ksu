import styled from '@emotion/styled';
import { DARK_GRAY } from '../../constants/colors';

export const KsuCardStyled = styled('div')`
  font-size: 1.3rem;
  line-height: 1.3;
  color:  ${DARK_GRAY};
  position: relative;
  min-height: 100px;
  font-family: 'Coco Gothic Alternate', sans-serif !important;
  font-weight: 300;

  .header h3 {
    font-family: 'Nexa Script', sans-serif;
    font-size: 1.8rem;
    margin-bottom: 0 !important;
  }
  
  .header,
  .content {
    padding: 15px 15px 0;
  }
  
  .action {
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
