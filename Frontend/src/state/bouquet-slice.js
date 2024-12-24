import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../utils/api";

export const fetchBouquets = createAsyncThunk(
  "bouquets/fetchBouquets",
  async (token) => {
    const bouquets = await fetchData(
      "http://localhost:3001/api/bouquets",
      "GET",
      null,
      {},
      token
    );
    return bouquets;
  }
);
const initialState = {
  bouquets: [],
};

const bouquetsSlice = createSlice({
  name: "bouquets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBouquets.fulfilled, (state, action) => {
      state.bouquets = action.payload;
    });
  },
});

export default bouquetsSlice.reducer;
