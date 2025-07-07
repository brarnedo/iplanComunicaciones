import { configureStore } from '@reduxjs/toolkit';
import { counterSlice, pokemonSlice } from 'store';

import './slices';

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		pokemon: pokemonSlice.reducer,
	},
});
