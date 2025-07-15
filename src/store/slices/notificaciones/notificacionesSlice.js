import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingNotificaciones: false,
    notificaciones: [],
};

export const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {
    starLoadingNotificaciones: (state, action) => {
      state.isLoadingNotificaciones = action.payload;
    },
    setNotificaciones: (state, action) => {
      state.notificaciones = action.payload.notificaciones;
    }
  },
});

export const {
  starLoadingNotificaciones,
  setNotificaciones,
} = notificacionesSlice.actions;
