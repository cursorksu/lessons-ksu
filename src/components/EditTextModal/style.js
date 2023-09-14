import styled from '@emotion/styled';

export const BlockWrapperStyled = styled.div`
  border: 1px solid tomato;
  padding: 12px;
  border-radius: 4px;
  background: transparent;
  margin-bottom: 12px;
  box-shadow: none;
`;
export const BlockWrapperFlexStyled = styled(BlockWrapperStyled)`
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
  grid-gap: 12px;

  .declaration {
    font-weight: 500;
  }

  .text {
    font-size: 12px;
  }
`;
export const EditModalStyled = styled.div`
  .title {
    font-weight: 600;
    font-size: 1.25rem;
    padding-right: 20px;
    margin: 0;
  }
  .btn-wrapper {
    width: auto;
    display: flex;
    justify-content: left;
  }
`;
