// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { catApiSlice } from './features/catApiSlice';

export const store = configureStore({
  reducer: {
    [catApiSlice.reducerPath]: catApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApiSlice.middleware),
});