import styled from '@emotion/styled';
import { CHOCO, CREAM, HOVER_GOLD, PRIMARY_MAIN } from '../../constants/colors';

export const KsuTagsStyled = styled.div`
  .tags-input-container {
    border: 1px solid ${PRIMARY_MAIN};
    padding: 3px 3px 3px 10px;
    border-radius: 4px;
    min-width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    min-height: 36px;
    font-size: 1.2rem;
    font-family: Montserrat, sans-serif;
    color: ${PRIMARY_MAIN};
    font-width: 300;

    &.focused {
      background-color: ${HOVER_GOLD};
    }
  }

  .tag-item {
    background-color: ${CREAM};
    display: inline-block;
    padding: 3px 3px 3px 9px;
    border-radius: 16px;
    color: ${CHOCO};
  }
  .tag-item .close {
    height: 20px;
    width: 20px;
    background-color: ${CHOCO};
    color: ${CREAM};
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .tags-input {
    background-color: transparent;
    flex-grow: 1;
    padding: 2px 0;
    border: none;
    outline: none;
    font-size: 1.2rem;
    font-family: Montserrat, sans-serif;
    color: ${PRIMARY_MAIN};
    font-weight: 300;

    &::placeholder {
      font-size: 1.2rem;
      font-family: Montserrat, sans-serif;
      color: ${PRIMARY_MAIN};
      font-weight: 300;
    }
  }
`;
