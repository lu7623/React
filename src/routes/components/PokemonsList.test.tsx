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
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from '../Root';
import PokemonsList from './PokemonsList';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn().mockReturnValue({
    search: '',
    pathname: '/page/1',
  }),
  useLoaderData: jest.fn().mockReturnValue({
    details: {
      pokemon: pokemons[0],
      desc: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
    },
  }),
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: '',
  }),
}));

jest.mock('../../api/getPokemons', () => ({
  getPokemon: jest.fn().mockReturnValue(pokemons[0]),
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
}));
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

import '@testing-library/jest-dom';

describe('Pokemons list ', () => {
  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <pokemonsContext.Provider value={[]}>
        <PokemonsList />
      </pokemonsContext.Provider>
    );
    await waitFor(() => {
      const text = screen.getByText('No results found');

      expect(text).toBeInTheDocument();
    });
  });
  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <pokemonsContext.Provider value={pokemons}>
          <Routes>
            <Route path="/page/1" element={<PokemonsList />} />
          </Routes>
        </pokemonsContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const pokemonImages = screen.getAllByAltText('pokemon');

      expect(pokemonImages.length).toBe(2);
    });
  });
});
