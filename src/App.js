import React from 'react';
import './App.css';
import { AppRouter } from './router';
import { Notification } from './components/Notification';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';

import './i18n';
import { Control } from './pages/Control';

function Situations() {
  return (
    <Provider store={store}>
      <div className="App">
        <Control />
        <AppRouter />
        <Notification />
      </div>
    </Provider>
  );
}

export default Situations;
