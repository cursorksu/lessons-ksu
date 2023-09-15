import React from 'react';
import { Box } from '@mui/material';
import { Notification } from '../../Notification';

export const TabPanelSubject = ({ value, show }) => {
  return show
    ? <Box value={value}><h1>Subject</h1></Box>
    : <></>;
};
