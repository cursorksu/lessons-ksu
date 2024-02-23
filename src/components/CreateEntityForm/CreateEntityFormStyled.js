import styled from '@emotion/styled';
import { GOLD } from '../../constants/colors';

export const CreateEntityFormStyled = styled('div')`
  background: #fff;
  padding: 40px;
  border-top: 1px solid ${GOLD};
    
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        margin-bottom: 20px;
    }
`;