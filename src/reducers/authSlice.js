import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegister, fetchLogin } from "../api/api";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetchRegister(email, password);
      const { user, token } = response.data;

      return { user, token };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetchLogin(email, password);
      const { user, token } = response.data;

      return { user, token };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
    },
    [register.rejected]: (state) => {
      state.isLoading = false;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
