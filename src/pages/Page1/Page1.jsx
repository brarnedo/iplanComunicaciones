import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from 'store';
import { getPokemons } from 'store';

export const Page1 = () => {
	const { pokemons, page, isLoadingPokemon } = useSelector(
		state => state.pokemon,
	);
	const { counter } = useSelector(state => state.counter);
	const dispatch = useDispatch();

	return (
		<div className='flex h-screen flex-col items-center justify-center bg-blue-500 gap-2 text-white'>
			<div className='flex items-center justify-center gap-2'>
				<button
					className='text-3xl font-bold text-white border-2 rounded-md p-2 border-white'
					onClick={() => {
						dispatch(increment());
					}}
					type='button'>
					+
					<FontAwesomeIcon
						icon={faCoffee}
						beat
					/>
				</button>
			</div>
			<div className='flex items-center justify-center gap-2'>
				<button
					className='text-3xl font-bold text-white border-2 rounded-md p-2 border-white'
					onClick={() => {
						dispatch(decrement());
					}}
					type='button'>
					-
					<FontAwesomeIcon
						icon={faCoffee}
						beat
					/>
				</button>
			</div>
			<div className='flex items-center justify-center gap-2'>
				<button
					className='text-3xl font-bold text-white border-2 rounded-md p-2 border-white'
					onClick={() => {
						dispatch(incrementByAmount(2));
					}}
					type='button'>
					+
					<FontAwesomeIcon
						icon={faCoffee}
						beat
					/>
					<FontAwesomeIcon
						icon={faCoffee}
						beat
					/>
				</button>
			</div>

			<div className='flex items-center justify-center mt-4 gap-2'>
				<p className='font-nunito'>Total de</p>
				<p className='font-figtree text-white'>{counter}</p>
				<FontAwesomeIcon
					icon={faCoffee}
					beat
				/>
				<p className='font-lato'>recibidos</p>
			</div>

			<div className='flex flex-col items-center justify-center mt-4 gap-2'>
				<h2 className='font-nunito'>Pokemons</h2>
				<hr></hr>
				<span className='font-nunito'>
					Loading: {isLoadingPokemon ? 'True' : 'False'}
				</span>
				<ul>
					{pokemons.map(pokemon => (
						<li
							className='font-nunito'
							key={pokemon.name}>
							{pokemon.name}
						</li>
					))}
				</ul>

				<button
					className='text-3xl font-bold text-white border-2 rounded-md p-2 border-white'
					onClick={() => dispatch(getPokemons(page))}>
					Get 10 Pokemons
				</button>
			</div>
		</div>
	);
};
