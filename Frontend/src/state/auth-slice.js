import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur d'authentification");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token") || null,
    fullname: Cookies.get("fullname") || null,
    userId: Cookies.get("userId") || null,
    login: "",

    isAuthenticated: !!Cookies.get("token"),
    error: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.fullname = "";
      state.login = "";
      state.isAuthenticated = false;

      Cookies.remove("token");
      Cookies.remove("fullname");
      Cookies.remove("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.fullname = action.payload.fullname;
        state.login = action.payload.login;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;

        Cookies.set("token", action.payload.token, { expires: 1 });
        Cookies.set("fullname", action.payload.fullname, {
          expires: 7,
          secure: true,
        });
        Cookies.set("userId", action.payload.userId, {
          expires: 7,
          secure: true,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const whoIsAuthenticated = (state) => ({
  fullname: state.auth.fullname,
  userId: state.auth.userId,
});
export const selectToken = (state) => state.auth.token;
export const authError = (state) => state.auth.error;
export default authSlice.reducer;
