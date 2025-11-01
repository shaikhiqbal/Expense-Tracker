import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import transactionsReducer from '../features/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;