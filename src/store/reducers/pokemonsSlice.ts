import { Pokemon } from '../../api/types';
import { createSlice } from '@reduxjs/toolkit';

interface pokemonState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string;
}

const initialState: pokemonState = {
  pokemons: [],
  isLoading: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
});

export default pokemonSlice.reducer;
