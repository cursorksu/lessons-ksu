import styled from '@emotion/styled';

export const DndItemStyled = styled.div`
  background: transparent;
  overflow: visible;
  margin: 0 0 12px 0;
  position: relative;
  padding: 2px;

  .drag-handle,
  .remove-handle {
    position: absolute;
    top: 3px;
  }

  .remove-handle {
    right: 30px;
  }

  .drag-handle {
    right: 0px;
  }
`;
