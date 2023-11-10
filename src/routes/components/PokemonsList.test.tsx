const pokemons: Pokemon[] = [
  {
    name: 'Pikachu',
    id: 1,
    height: 10,
    weight: 10,
    sprites: { front_default: '', back_default: '' },
    species: { name: '', url: '' },
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
  },
  {
    name: 'Caterpie',
    id: 2,
    height: 10,
    weight: 10,
    sprites: { front_default: '', back_default: '' },
    species: { name: '', url: '' },
    types: [{ slot: 1, type: { name: 'normal', url: '' } }],
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
  },
];

import { Pokemon } from '../../api/types';
import PokemonsList from './PokemonsList';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('../../api/getPokemons', () => ({
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
}));
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react'),
  useParams: jest.fn().mockReturnValue({ pageId: '1' }),
  Outlet: () => {
    null;
  },
  Link: () => {
    null;
  },
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ search: '' }),
}));

import { pokemonsContext } from '../Root';

describe('Show pokemons list ', () => {
  it('renders list with 2 cards', async () => {
    render(
      <pokemonsContext.Provider value={pokemons}>
        <PokemonsList />
      </pokemonsContext.Provider>
    );
    await waitFor(() => {
      const pikachu = screen.getByText('PIKACHU');

      expect(pikachu).toBeVisible();
    });
  });
});
