import React from 'react';
import './App.css';
import { Grid, ThemeProvider } from '@mui/material';
import { AppRouter } from './router';
import { theme } from './theme';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Notification } from './components/Notification';
import { Provider } from 'react-redux';
import store from './store';

import './i18n';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <Grid container className='App'>
            <AppRouter />
            <Notification />
          </Grid>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
