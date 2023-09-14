import React from 'react';
import './App.css';
import { Grid, ThemeProvider } from '@mui/material';
import { AppRouter } from './router';
import { theme } from './theme';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './i18n';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Grid container className="App">
          <AppRouter />
        </Grid>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
