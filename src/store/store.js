import { configureStore } from '@reduxjs/toolkit';
import { authSlice, counterSlice, pokemonSlice } from 'store';

import './slices';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		counter: counterSlice.reducer,
		pokemon: pokemonSlice.reducer,
	},
});
