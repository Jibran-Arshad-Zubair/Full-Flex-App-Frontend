import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiMiddleware, apiReducer, apiReducerPath } from "./api";
import user from "./reduxSlices/userSlice";
import chat from "./reduxSlices/chatSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 


const persistConfig = {
  key: "root",
  storage,
};


const rootReducer = combineReducers({
  user,
  chat,
  [apiReducerPath]: apiReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiMiddleware),
});
