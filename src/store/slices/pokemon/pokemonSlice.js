import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		page: 0,
		pokemons: [],
		isLoadingPokemon: false,
	},
	reducers: {
		starLoadingPokemons: (state /* action */) => {
			state.isLoadingPokemon = true;
		},
		setPokemons: (state, action) => {
			state.isLoadingPokemon = false;
			state.page = action.payload.page;
			state.pokemons = action.payload.pokemons;
		},
	},
});
export const { starLoadingPokemons, setPokemons } = pokemonSlice.actions;
