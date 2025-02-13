import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import categoriesReducer from './categoriesSlice';
import budgetGoalsReducer from './budgetGoalsSlice';
import exchangeRatesApi from './exchangeRatesApi';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    budgetGoals: budgetGoalsReducer,
    [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeRatesApi.middleware),
});


export default store;