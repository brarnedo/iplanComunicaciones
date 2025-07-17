import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingUpdateNotificaciones: false,
    statusUpdate:''
};

export const updateNotificacionesSlice = createSlice({
  name: "updateNotificaciones",
  initialState,
  reducers: {
    starLoadingUpdateNotificaciones: (state, action) => {
      state.isLoadingUpdateNotificaciones = action.payload;
    },
    setStatusUpdate: (state, action) => {
      state.statusUpdate = action.payload;
    }
  },
});

export const {
  starLoadingUpdateNotificaciones,
  setStatusUpdate,
} = updateNotificacionesSlice.actions;
