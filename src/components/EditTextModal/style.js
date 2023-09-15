import styled from '@emotion/styled';
import { BG_GOLD, PRIMARY_MAIN } from '../../constants/colors';

export const BlockWrapperStyled = styled.div`
  border: 1px solid ${BG_GOLD};
  padding: 20px 8px 8px;
  border-radius: 4px;
  background: transparent;
  box-shadow: none;

  &.hr {
    color: ${PRIMARY_MAIN};
    padding-top: 34px;
  }

  label {
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
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
