import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bouquets: JSON.parse(localStorage.getItem("mesBouquets")) || [],
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const bouquetsSlice = createSlice({
  name: "bouquets",
  initialState,
  reducers: {
    setBouquets(state, action) {
      state.bouquets = action.payload;
      saveToLocalStorage("mesBouquets", state.bouquets);
    },
  },
});

export const { setBouquets } = bouquetsSlice.actions;
export default bouquetsSlice.reducer;
