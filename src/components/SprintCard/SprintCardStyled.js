import styled from '@emotion/styled';
import { CHOCO, CREAM } from '../../constants/colors';

export const SprintCardStyled = styled('div')`
  padding: 20px;
  width: 100%;
  height: 100px;
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  outline: transparent 4px solid;
  transition: outline 0.3s ease-in-out;
  
  &:hover {
    outline: ${CREAM} 4px solid ;
  }
  
  &:after {
    content: '';
    width: 100px;
    height: 100px;
    background: ${CHOCO};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  img {
    position: absolute;
    top: 0;
    right: -60px;
    left: initial;
    z-index: 0;
    width: 100%;
    height: 200px !important;
    object-position: 100% 0;
    object-fit: cover;
    min-height: initial;
    max-height: initial;
    max-width: initial;
    min-width: initial;
  }
  
  .content {
    position: absolute;
    left: 0;
    top: 0;
    color: ${CREAM};
    z-index: 2;
    width: 60%;
    padding: 20px;

    .title {
      white-space: pre-wrap;
      font-family: 'Nexa Script', sans-serif;
      font-size: 1.3rem;
      font-weight: 500;
      margin: 0 !important;
    }
  }

  .shape {
    color: ${CHOCO};
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    min-height: initial;
    max-height: initial;
    max-width: initial;
    min-width: initial;
    display: block;
  }


`;