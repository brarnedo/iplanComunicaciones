import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: "",
  role: "",
  admin_level: "",
  errorLogin: false,
  isLoadingAuth: false,
  session: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    starLoadingLogin: (state, action) => {
      state.isLoadingAuth = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
    setAdminLevel: (state, action) => {
      state.admin_level = action.payload.admin_level;
    },
    setErrorLogin: (state, action) => {
      state.errorLogin = action.payload.errorLogin;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
    },
    setSession: (state, action) => {
      state.session = action.payload.session;
    },
  },
});

export const {
  starLoadingLogin,
  setIsAuthenticated,
  setUser,
  setRole,
  setAdminLevel,
  setErrorLogin,
  setLogout,
  setSession,
} = authSlice.actions;
