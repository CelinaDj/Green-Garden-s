import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../utils/api";

export const fetchFleurs = createAsyncThunk(
  "fleurs/fetchFleurs",
  async (token) => {
    const fleurs = await fetchData(
      "http://localhost:3001/api/fleurs",
      "GET",
      null,
      {},
      token
    );
    return fleurs;
  }
);

const fleursSlice = createSlice({
  name: "fleurs",
  initialState: {
    fleurs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFleurs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFleurs.fulfilled, (state, action) => {
        state.loading = false;
        state.fleurs = action.payload;
      })
      .addCase(fetchFleurs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fleursSlice.reducer;
