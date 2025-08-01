import { configureStore } from "@reduxjs/toolkit";
import { paymentApi } from "./Redux/queries/stripePayment/paymentApi";
import { authApi } from "./Redux/queries/user/authApi";

const middlewares = [authApi.middleware, paymentApi.middleware];

export const store = configureStore({
  reducer: {
    [paymentApi.reducerPath]: paymentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});
export default store;
