import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './store/notificationReducer';
import dataReducer from './store/dataReducer';
import mainMenuCollapsed from './store/mainMenuReducer';
import auth from './store/authReducer';

export default configureStore({
  reducer: {
    auth,
    notification: notificationReducer,
    lessonData: dataReducer,
    mainMenuCollapsed: mainMenuCollapsed,
  },
});
