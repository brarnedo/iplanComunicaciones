import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingNotificaciones: false,
    notificaciones: [],
    seleccionada: {
        titulo: '',
        msj: '',
        tipo: 0 //
    }
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
    },
    setSeleccionada: (state, action) => {
      state.seleccionada = action.payload.seleccionada;
    }
  },
});

export const {
  starLoadingNotificaciones,
  setNotificaciones,
  setSeleccionada
} = notificacionesSlice.actions;
