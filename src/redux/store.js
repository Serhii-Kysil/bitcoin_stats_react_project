import { configureStore } from "@reduxjs/toolkit";

import bitcoinReducer from "./Bitcoin/bitcoinSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const bitcoinPersistConfig = {
  key: "bitcoin",
  storage,
  whitelist: ["markers"],
};

export const store = configureStore({
  reducer: {
    bitcoin: persistReducer(bitcoinPersistConfig, bitcoinReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
