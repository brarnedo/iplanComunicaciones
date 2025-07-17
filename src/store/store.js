import { configureStore } from '@reduxjs/toolkit';
import { authSlice, notificacionesSlice, updateNotificacionesSlice, deleteNotificacionesSlice  } from 'store';
import { saveComunicacionSlice } from "./slices/saveComunicacion";

import './slices';

// import {saveComunicacionSlice} from "./slices"

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		notificaciones: notificacionesSlice.reducer,
		saveComunicacion: saveComunicacionSlice.reducer,
		updateNotificaciones: updateNotificacionesSlice.reducer,
		deleteNotificaciones: deleteNotificacionesSlice.reducer
	},
});
