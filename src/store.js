import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './store/notificationReducer';
import dataReducer from './store/dataReducer';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    lessonData: dataReducer,
  },
});
