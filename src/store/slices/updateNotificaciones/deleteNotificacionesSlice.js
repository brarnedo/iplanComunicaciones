import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingDeleteNotificaciones: false,
    status:false
};

export const deleteNotificacionesSlice = createSlice({
  name: "deleteNotificaciones",
  initialState,
  reducers: {
    starLoadingDeleteNotificaciones: (state, action) => {
      state.isLoadingDeleteNotificaciones = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
    }
  },
});

export const {
  starLoadingDeleteNotificaciones,
  setStatus,
} = deleteNotificacionesSlice.actions;
