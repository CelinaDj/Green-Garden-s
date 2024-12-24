import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, postData } from "../utils/api";
import Cookies from "js-cookie";
export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async ({ bouquetId, userId, token }, { rejectWithValue }) => {
    try {
      const requestData = {
        userId,
        bouquetId,
      };

      const data = await postData(
        "http://localhost:3001/like",
        requestData,
        {},
        token
      );

      console.log("Response data:", data);

      return { bouquetId, likesCount: data.likesCount };
    } catch (error) {
      console.error("Erreur dans toggleLike:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    const token = Cookies.get("token");

    try {
      const response = await fetchData(
        `http://localhost:3001/${userId}/wishlist`,
        "GET",
        null,
        {},
        token
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Fetch liked bouquets for a user
export const fetchLikedBouquetsIds = createAsyncThunk(
  "likes/fetchLikedBouquets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/${userId}/likes`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch liked bouquets");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching liked bouquets:", error);
      return rejectWithValue(error.message);
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likedBouquets: [],
    wishlist: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchLikedBouquetsIds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLikedBouquetsIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedBouquets = action.payload;
      })
      .addCase(fetchLikedBouquetsIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //  wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { bouquetId } = action.payload;

        if (state.likedBouquets.includes(bouquetId)) {
          state.likedBouquets = state.likedBouquets.filter(
            (id) => id !== bouquetId
          );
        } else {
          state.likedBouquets.push(bouquetId);
        }
      });
  },
});

export default likesSlice.reducer;
