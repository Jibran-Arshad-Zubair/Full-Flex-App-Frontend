import { configureStore } from "@reduxjs/toolkit";
import { paymentApi } from "./Redux/queries/stripePayment/paymentApi";
import { authApi } from "./Redux/queries/user/authApi";
import  useReducer  from "./Redux/reduxSlices/userSlice";
import  chatReducer  from "./Redux/reduxSlices/chatSlice";
import { messagesApi } from "./Redux/queries/message/userMessages";
const middlewares = [authApi.middleware, paymentApi.middleware , messagesApi.middleware];

export const store = configureStore({
  reducer: {
    user: useReducer,
    chat: chatReducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});
export default store;
