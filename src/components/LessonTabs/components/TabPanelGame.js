import React from 'react';
import { Box } from '@mui/material';

export const TabPanelGame = ({ value, show }) => {
  return show ? (
    <Box value={value}>
      <h1>Game</h1>
    </Box>
  ) : (
    <></>
  );
};
