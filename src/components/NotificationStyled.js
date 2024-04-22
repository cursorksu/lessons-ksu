import styled from '@emotion/styled';
import {
  CHOCO, GOLD, ITEM_INNER, ITEM_OUTER, SUCCESS, YELLOW_MAIN
} from '../constants/colors';

export const NotificationStyled = styled.div`
  max-width: calc(100% - 80px);
  position: absolute;
  top: 0;
  left: 80px;
  right: 0;
  z-index: 100;
  background: white;
  text-align: center;
  padding: 10px 40px;
  color: #fff;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  font-size: 1.6rem;
  box-shadow: ${ITEM_OUTER};
  border-radius: 10px;

  &:after {
    border-radius: 10px;
    position: absolute;
    top: 6px;
    right: 6px;
    left: 6px;
    bottom: 6px;
    content: '';
    z-index: 1;
    box-shadow: ${ITEM_INNER};
  }
  span {
    color: ${CHOCO};
  }

  &.open {
    padding: 20px;
    border: 2px solid transparent;
  }

  &.error {
    background: ${YELLOW_MAIN};
  }
  &.success {
    background: ${SUCCESS};
  }
  &.info {
    background: ${GOLD};
  }
`;
