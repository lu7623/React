import { Pokemon } from './types';

export const mockPokemon: Pokemon = {
  name: 'Pikachu',
  description:
    'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
  id: 1,
  height: 10,
  weight: 10,
  sprites: { front_default: '', back_default: '' },
  species: { name: '', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  stats: [
    {
      base_stat: 1,
      effort: 1,
      stat: {
        name: 'hp',
        url: '',
      },
    },
  ],
};

export const mockPokemonsArr = [
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
  mockPokemon,
];
