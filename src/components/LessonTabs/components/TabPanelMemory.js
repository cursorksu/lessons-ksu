import React from 'react';
import { Box } from '@mui/material';

export const TabPanelMemory = ({ value, show }) => {
  return show ? (
    <Box value={value}>
      <h1>Memory</h1>
    </Box>
  ) : (
    <></>
  );
};
