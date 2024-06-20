import { configureStore } from "@reduxjs/toolkit";

import bitcoinReducer from "./Bitcoin/bitcoinSlice";

export const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer,
  },
});
