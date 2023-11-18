import { Pokemon } from '../../api/types';
import { createSlice } from '@reduxjs/toolkit';

interface pokemonState {
  currentPokemons: Pokemon[];
  isLoading: boolean;
  error: string;
}

const initialState: pokemonState = {
  currentPokemons: [],
  isLoading: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
});

export default pokemonSlice.reducer;
