import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Read saved values from cookies
const token = Cookies.get("token");
const role = Cookies.get("role");
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const initialState = {
  token: token || null,
  role: role || null,
  user: user || null,
  isAuthenticated: token ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Called after successful login
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      // Save all data to secure cookies
      Cookies.set("token", action.payload.token, {
        expires: 7,
        sameSite: "Lax",
      });
      Cookies.set("role", action.payload.role, {
        expires: 7,
        sameSite: "Lax",
      });
      Cookies.set("user", JSON.stringify(action.payload.user), {
        expires: 7,
        sameSite: "Lax",
      });
      Cookies.set(
        "employeeName",
        action.payload.user?.name?.firstName || action.payload.user?.name || "",
        {
          expires: 7,
          sameSite: "Lax",
        }
      );
    },

    // Logout clears everything
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;

      // Remove all cookies
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("user");
      Cookies.remove("employeeName");

      // Clear localStorage as backup
      localStorage.clear();

      window.location.href = "/login";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
