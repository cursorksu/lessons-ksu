import styled from '@emotion/styled';
import { PRIMARY_MAIN } from '../../constants/colors';

export const CreateEntityFormStyled = styled('div')`
  background: #fff;
  padding: 40px;
  border-top: 1px solid ${PRIMARY_MAIN};
  
  .d-flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
  }
  
  .avatar {
    border: 1px solid ${PRIMARY_MAIN};
    border-radius: 50%;
    margin-right: 40px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      margin: 0;
    }
  }
    
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        margin-bottom: 20px;
    }
`;
