import styled from "@emotion/styled";
import { BORDER_GRAY } from "../../constants/colors";

export const DndItemStyled = styled.div`
  background: transparent;
  overflow: visible;
  margin: 0 0 12px 0;
  position: relative;
  padding: 2px;

  .MuiInputBase-root {
    display: block;
    width: 100%;
    overflow: hidden;

    cursor: pointer;
    font-weight: 300;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid ${BORDER_GRAY};

    input {
      width: calc(100% - 50px);
      border: none;
    }
  }

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
