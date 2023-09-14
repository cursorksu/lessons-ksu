import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PRIMARY_MAIN } from "../../constants/colors";

export const GoBackButtonStyled = styled(Button)`
  width: 60px;
  height: 60px;
  min-width: initial;
  background: transparent;
  border: 1px solid ${PRIMARY_MAIN};
  border-radius: 50%;
  color: ${PRIMARY_MAIN};

  svg {
    width: 30px;
    height: 30px;
  }
`;
