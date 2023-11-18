import { Pokemon } from '../../api/types';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from '../Root0000';
import PokemonsList from './PokemonsList';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn().mockReturnValue({
    search: '',
    pathname: '/page/1',
  }),
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: '',
  }),
}));

jest.mock('../../api/getPokemons', () => ({
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
}));
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

import '@testing-library/jest-dom';
import { mockPokemon } from '../../api/mockPokemon';

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
    const pokemons: Pokemon[] = [mockPokemon, mockPokemon];
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
