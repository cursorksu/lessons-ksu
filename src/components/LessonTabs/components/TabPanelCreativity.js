import React from 'react';
import { Box } from '@mui/material';

export const TabPanelCreativity = ({ value, show }) => {
  return show ? (
    <Box value={value}>
      <h1>Creativity</h1>
    </Box>
  ) : (
    <></>
  );
};
