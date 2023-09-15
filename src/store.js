import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './store/notificationReducer';

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
