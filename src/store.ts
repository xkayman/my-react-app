import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;