import React from 'react';
import './App.css';
import { Grid, ThemeProvider } from '@mui/material';
import { AppRouter } from './router';
import { theme } from './theme';
import { Notification } from './components/Notification';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';

import './i18n';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container className='App'>
          <AppRouter />
          <Notification />
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
