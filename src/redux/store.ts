import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import announceReducer from '@/redux/features/announceSlice';
import categoryReducer from '@/redux/features/categorySlice';
import suggestTopicReducer from '@/redux/features/suggestTopicSlice';

export const store = configureStore({
  reducer: {
    suggestTopicReducer,
    categoryReducer,
    announceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
