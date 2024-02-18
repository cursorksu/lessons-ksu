import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './store/notificationReducer';
import dataReducer from './store/dataReducer';
import mainMenuCollapsed from './store/mainMenuReducer';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    lessonData: dataReducer,
    mainMenuCollapsed: mainMenuCollapsed,
  },
});
