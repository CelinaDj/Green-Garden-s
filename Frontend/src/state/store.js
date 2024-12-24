import { configureStore } from "@reduxjs/toolkit";
import bouquetsReducer from "./bouquet-slice";
import likesReducer from "./likes-slice";
import cartReducer from "./cart-slice";
import fleursReducer from "./fleur-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    bouquets: bouquetsReducer,
    likes: likesReducer,
    cart: cartReducer,
    fleurs: fleursReducer,
    auth: authReducer,
  },
});

export default store;
