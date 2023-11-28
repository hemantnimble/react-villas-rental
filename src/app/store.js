import { configureStore } from '@reduxjs/toolkit';
import villaInfoReducer from '../features/villaInfo/villaInfoSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    villaInfo: villaInfoReducer,
    users: userReducer,
  },
});
