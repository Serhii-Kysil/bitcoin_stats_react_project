import { createSlice } from "@reduxjs/toolkit";
import { getBitcoinCurrency } from "./opetations";
import { toUnixTimestamp, getPreviousDay } from "../../utils/dateUtils";

import toast from "react-hot-toast";

const previousDate = getPreviousDay(new Date());
const currentDateTimestamp = toUnixTimestamp(previousDate);

const bitcoinSlice = createSlice({
  name: "bitcoin",
  initialState: {
    items: [],
    startDate: currentDateTimestamp,
    endDate: currentDateTimestamp,
    frequency: "1d",
    isLoading: false,
    error: null,
    lastSyncTime: null,
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setFrequency: (state, action) => {
      state.frequency = action.payload;
    },
    setLastSyncTime: (state, action) => {
      state.lastSyncTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBitcoinCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBitcoinCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.lastSyncTime = Date.now();
        toast.success("Data fetched successfully!");
      })
      .addCase(getBitcoinCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to fetch data");
      });
  },
});

export const { setStartDate, setEndDate, setFrequency, setLastSyncTime } =
  bitcoinSlice.actions;

const bitcoinReducer = bitcoinSlice.reducer;
export default bitcoinReducer;
