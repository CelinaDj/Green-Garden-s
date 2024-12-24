import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../utils/api";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const handlePurchase = createAsyncThunk(
  "cart/handlePurchase",
  async ({ userId, cart, token }, { dispatch, rejectWithValue }) => {
    const bouquetsToPurchase = cart.map((bouquet) => ({
      id: bouquet.id,
      prix: bouquet.price,
    }));

    const requestData = {
      userId,
      bouquets: bouquetsToPurchase,
    };

    try {
      const result = await postData(
        "http://localhost:3001/purchase",
        requestData,
        {},
        token
      );

      dispatch(purchaseCart({ userId, bouquets: bouquetsToPurchase }));

      return result;
    } catch (error) {
      console.error("Error during purchase:", error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sauvegarder
    },
    purchaseCart(state, action) {
      const { userId, bouquets } = action.payload;
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sauvegarder
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((bouquet) => bouquet.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, purchaseCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
