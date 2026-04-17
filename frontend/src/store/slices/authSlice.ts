import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload, RegisterPayload, AuthUser } from "../../types/tracker.types";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ── Thunks ──────────────────────────────────────────────

export const loginUser = createAsyncThunk<AuthUser, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message ?? "Login failed");
      }

      return await res.json() as AuthUser;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const registerUser = createAsyncThunk<AuthUser, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message ?? "Registration failed");
      }

      return await res.json() as AuthUser;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
