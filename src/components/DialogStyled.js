import styled from '@emotion/styled';
import { Dialog } from '@mui/material';

export const DialogStyled = styled(Dialog)`
  padding: 20px;

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

  .MuiDialog-paper {
    min-width: ${({ custommaxwidth }) => custommaxwidth || 1000}px;
  }

  &.confirmation-modal {
    .MuiDialog-paper {
      min-width: 500px;
    }
  }

  &.small {
    .MuiDialog-paper {
      min-width: 600px;
    }
  }

  .MuiDialogActions-root {
    padding: 0;
  }

  .MuiDialogTitle-root {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .MuiDialogActions-root {
    padding: 30px;
  }
`;
