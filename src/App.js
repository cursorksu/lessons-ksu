import React from 'react';
import { AppRouter } from './router';
import { Notification } from './components/Notification';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';

import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function Situations() {
  return (
    <Provider store={store}>
      <>
        <Notification />
        <AppRouter />
      </>
    </Provider>
  );
}

export default Situations;
