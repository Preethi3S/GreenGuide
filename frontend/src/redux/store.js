import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import userReducer from '../features/userProfile/userSlice.js';
import plantReducer from '../features/plants/plantSlice.js';
import reminderReducer from '../features/reminders/reminderSlice.js';
import notificationReducer from '../features/notifications/notificationSlice.js';
import diseaseReducer from '../features/diseaseDetector/diseaseSlice.js';
import waterTrackerReducer from '../features/waterTracker/waterSlice.js';
import growthLogReducer from '../features/growthTracker/growthSlice.js';
import communityReducer from '../features/community/communitySlice.js';
import shopReducer from '../features/shop/shopSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    plant: plantReducer,
    reminder: reminderReducer,
    notification: notificationReducer,
    disease: diseaseReducer,
    waterTracker: waterTrackerReducer,
    growthLog: growthLogReducer,
    community: communityReducer,
    shop : shopReducer,
  },
});

export default store;