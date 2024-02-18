import React from 'react';
import './App.css';
import { AppRouter } from './router';
import { Notification } from './components/Notification';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';

import './i18n';

function Situations() {
  return (
    <Provider store={store}>
      <>
        <AppRouter />
        <Notification />
      </>
    </Provider>
  );
}

export default Situations;
