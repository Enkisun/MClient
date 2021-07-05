import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../slices/authSlice";

const authConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(authConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
