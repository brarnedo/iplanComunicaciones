import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingNotificacionesArchivadas: false,
    notificacionesArchivadas: [],
};

export const archivadasSlice = createSlice({
  name: "archivadas",
  initialState,
  reducers: {
    starLoadingNotificacionesArchivadas: (state, action) => {
      state.isLoadingNotificacionesArchivadas = action.payload;
    },
    setNotificacionesArchivadas: (state, action) => {
      state.notificacionesArchivadas = action.payload.notificacionesArchivadas;
    }
  },
});

export const {
  starLoadingNotificacionesArchivadas,
  setNotificacionesArchivadas,
} = archivadasSlice.actions;
