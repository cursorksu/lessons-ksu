import styled from '@emotion/styled';
import { BG_GOLD, BG_SUCCESS, PRIMARY_HOVER } from '../constants/colors';

export const NotificationStyled = styled.div`
  right: 60px;
  position: fixed;
  top: 60px;
  z-index: 100;
  background: white;
  border-radius: 4px;
  border: 0;
  max-width: 300px;
  padding: 0;
  
  &.open {
    padding: 20px;
    border: 2px solid transparent;
  }
  
  &.error {
    border: 2px solid  ${PRIMARY_HOVER};
  }
  &.success {
    border: 2px solid ${BG_SUCCESS};
  }
  &.info {
    border: 2px solid ${BG_GOLD};
  }
`;
