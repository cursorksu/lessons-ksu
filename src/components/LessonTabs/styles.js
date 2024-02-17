import styled from '@emotion/styled';
import { FormField } from 'semantic-ui-react';

export const TabStyled = styled(FormField)`
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;

  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
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
      content: '';
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    svg {
      width: 26px;
      height: 26px;
      display: inline;
      margin-right: 20px;
    }
  }
`;
