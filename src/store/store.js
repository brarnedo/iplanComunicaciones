import { configureStore } from '@reduxjs/toolkit';
import { authSlice, notificacionesSlice  } from 'store';
import { saveComunicacionSlice } from "./slices/saveComunicacion";

import './slices';

// import {saveComunicacionSlice} from "./slices"

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		notificaciones: notificacionesSlice.reducer,
		saveComunicacion: saveComunicacionSlice.reducer
	},
});
