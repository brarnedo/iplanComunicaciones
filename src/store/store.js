import { configureStore } from '@reduxjs/toolkit';
import { authSlice, archivadasSlice  } from 'store';
import { saveComunicacionSlice } from "./slices/saveComunicacion";

import './slices';

// import {saveComunicacionSlice} from "./slices"

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		archivadas: archivadasSlice.reducer,
		saveComunicacion: saveComunicacionSlice.reducer
	},
});
