import { configureStore } from '@reduxjs/toolkit';
import villaInfoReducer from '../features/villaInfo/villaInfoSlice'

export const store = configureStore({
  reducer: {
    villaInfo: villaInfoReducer,
  },
});
