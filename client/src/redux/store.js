import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";
import { createBlacklistFilter } from "redux-persist-transform-filter";

const rootReducer = combineReducers({
  auth: authReducer,
});

// Exclure error lors de la persistance
const saveAuthSubsetFilter = createBlacklistFilter("auth", ["error"]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [saveAuthSubsetFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/PURGE"],
      },
    }),
});

export const persistor = persistStore(store);
