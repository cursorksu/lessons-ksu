import styled from '@emotion/styled';
import { CHOCO, CREAM } from '../../constants/colors';

export const SprintCardStyled = styled('div')`
  width: 100%;
  height: 200px;
  position: relative;
  background-color: ${CHOCO};
  border-radius: 4px;
  overflow: hidden;
  outline: transparent 4px solid;
  transition: outline 0.3s ease-in-out;
  
  &:hover {
    outline: ${CREAM} 4px solid ;
    
    .title.hover {
      transform: translateY(0);
      transition: transform 0.4s ease-in-out;
    }
  }
  
  img {
    position: absolute;
    top: 0;
    right: 0;
    left: initial;
    z-index: 0;
    width: 260px;
    height: 200px;
    object-position: right;
    object-fit: cover;
  }
  
  .content {
    position: absolute;
    left: 0;
    top: 0;
    color: ${CREAM};
    z-index: 2;
    width: calc(100% - 250px);
    height: 200px;
    overflow: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    white-space: pre-wrap;
    font-family: 'Nexa Script', sans-serif;
    font-size: 1.8rem;
    font-weight: 300;
    margin: 0 !important;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .shape {
    color: ${CHOCO};
    z-index: 1;
    position: absolute;
    top: 0;
    right: 85px;
    bottom: 0;
    display: block;
  }

  .shape-light {
    color: ${CREAM};
    transform: rotate(5deg);
    z-index: 0;
    position: absolute;
    top: 10px;
    right: 65px;
    bottom: 0;
    display: block;
  }

  .meta {
    font-family: "Coco Gothic Alternate", sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: ${CREAM};
    opacity: 0.5;
    text-align: left;
  }
  
  .description {
    min-height: 60px;
    overflow: hidden;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  .title.hover {
    width: 100%;
    height: 200px;
    background-color: ${CHOCO};
    color: ${CREAM};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    padding: 40px;
    z-index: 10;
    white-space: pre-wrap;
  }
`;