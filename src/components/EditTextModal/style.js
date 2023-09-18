import styled from '@emotion/styled';
import { BG_GOLD, GOLD, HOVER_GOLD } from '../../constants/colors';

export const BlockWrapperStyled = styled.div`
  position: relative;
  border: 1px solid ${BG_GOLD};
  padding: 20px 8px 8px;
  border-radius: 4px;
  background: transparent;
  box-shadow: none;
  width: 95%;
  
    &:after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${GOLD};
    display: block;
    box-shadow: 
            0 -11px ${GOLD}, 
            0 11px ${GOLD}, 
            0 -22px ${GOLD}, 
            0 22px ${GOLD};
    margin: -3px auto;
    position: absolute;
    right: 35px;
    top: 50%;
  }
`;

export const BlockWrapperInputStyled = styled.div`
  position: relative;
  border: 1px solid ${BG_GOLD};
  border-radius: 4px;
  background: transparent;
  box-shadow: none;
  width: 100%;
  padding: 4px 46px 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-right: 0;
  transition: background-color 0.3s ease-in-out;
  
  &:hover {
    background: ${HOVER_GOLD};
  }
  
  &.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  }
  
  &.divider {
    padding-top: 12px;
  
    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    label {
      flex-basis: 100%;
    }
    hr {
      width: 94%;
      color: ${GOLD};
    }
  }

  & > div {
    margin: 0;
    width: 100%;
  }

  & > button {
    position: absolute;
    right: 0;
    bottom: 12px;
  }

  &:after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: transparent;
    display: block;
    box-shadow: none;
    margin: -3px auto;
    position: absolute;
    right: 35px;
    bottom: 32px;
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  &:hover:after {
    background: ${GOLD};
    box-shadow: 0 -11px ${GOLD},
    0 11px ${GOLD};
  }
`;

export const BlockWrapperFlexStyled = styled(BlockWrapperStyled)`
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
  grid-gap: 8px;
  border: none;
  padding: 8px 0;

  button {
    height: 34px;
    align-self: end;
  }

  .declaration {
    font-weight: 500;
  }

  .text {
    font-size: 12px;
  }
`;
