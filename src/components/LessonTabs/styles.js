import styled from "@emotion/styled";
import { FormControl } from "@mui/material";

export const TabStyled = styled(FormControl)`
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;

  .btn-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    position: absolute;
    right: 12px;
    top: 30px;
  }

  .MuiBox-root {
    border-color: transparent;
  }
  .MuiTabs-flexContainer {
    position: relative;
    z-index: 1;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      z-index: 0;
    }
  }
  .MuiTab-root {
    color: white;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 12px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
`;
