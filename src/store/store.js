import { configureStore } from '@reduxjs/toolkit';
import { authSlice  } from 'store';
import { saveComunicacionSlice } from "./slices/saveComunicacion";

import './slices';

// import {saveComunicacionSlice} from "./slices"

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		saveComunicacion: saveComunicacionSlice.reducer


	
	},
});
