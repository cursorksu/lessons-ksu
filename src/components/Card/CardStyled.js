import { Card } from '@mui/material';
import styled from '@emotion/styled';
import { BORDER_GRAY } from '../../constants/colors';

export const CardStyled = styled(Card)`
  color: #fff;
  border: 1px solid tomato;
  padding: 12px;
  border-radius: 4px;
  background: transparent;
  margin-bottom: 12px;

  h3 {
    border-bottom: 1px solid ${BORDER_GRAY};
    margin: 0;
    padding-bottom: 8px;
  }

  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .MuiCardActions-root,
  .MuiCardContent-root {
    padding: 0;
  }

  .MuiCardActions-root {
    padding-top: 20px;
  }
`;
