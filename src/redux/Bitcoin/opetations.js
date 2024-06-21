import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const url = import.meta.env.VITE_YAHOO_FINANCE_URL;

export const getBitcoinCurrency = createAsyncThunk(
  "bitcoin/getBitcoinCurrency",
  async ({ period1, period2, frequency }, thunkAPI) => {
    const params = {
      period1,
      period2,
      interval: frequency,
      events: "history",
    };

    const proxyUrl = `${CORS_PROXY}${url}`;

    try {
      const response = await axios.get(proxyUrl, { params });

      const lines = response.data.split("\n");

      const headers = lines[0].split(",");

      const results = lines.slice(1).map((line) => {
        const values = line.split(",");
        return headers.reduce((acc, header, index) => {
          acc[header] = values[index];
          return acc;
        }, {});
      });

      return results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
