import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { paymentApi } from "./Redux/queries/stripePayment/paymentApi";
import { authApi } from "./Redux/queries/user/authApi";
import  useReducer  from "./Redux/reduxSlices/userSlice";
import  chatReducer  from "./Redux/reduxSlices/chatSlice";
import { messagesApi } from "./Redux/queries/message/userMessages";
const middlewares = [authApi.middleware, paymentApi.middleware , messagesApi.middleware];

import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { courseApi } from "./Redux/queries/course/courseApi";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
   user: useReducer,
    chat: chatReducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middlewares),
});
export const persistor = persistStore(store)
export default store;
