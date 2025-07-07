import axios from 'axios';
import { POKEMON } from 'env';

export const pokemonApi = axios.create({
	baseURL: POKEMON,
});
