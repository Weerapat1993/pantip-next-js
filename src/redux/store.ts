import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import categoryReducer from '@/redux/features/categorySlice';
import suggestTopicReducer from '@/redux/features/suggestTopicSlice';

export const store = configureStore({
  reducer: {
    suggestTopicReducer,
    categoryReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
