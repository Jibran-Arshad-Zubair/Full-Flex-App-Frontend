
import { configureStore } from '@reduxjs/toolkit';
import { paymentApi } from './Redux/queries/stripePayment/paymentApi';

export const store = configureStore({
  reducer: {
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(paymentApi.middleware),
});
export default store;