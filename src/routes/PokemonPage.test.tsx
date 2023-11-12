const mockPokemon: Pokemon = {
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
};

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Pokemon } from '../api/types';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from './Root';
import { PokemonPage } from './PokemonPage';

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
    detailsId: '1',
  }),
}));

const fakeGetPokemons = jest.fn().mockReturnValue(mockPokemon);
jest.mock('../api/getPokemons', () => ({
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
  getPokemon: () => fakeGetPokemons,
}));

describe('Pokemon page ', () => {
  it('Renders page with pagination and cards list correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <pokemonsContext.Provider value={[mockPokemon]}>
          <Routes>
            <Route path="/page/1" element={<PokemonPage />} />
          </Routes>
        </pokemonsContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const next = screen.getByText('next');
      const prev = screen.getByText('prev');
      const name = screen.getByText('PIKACHU');
      const weight = screen.getByText('Weight: 1 kg');
      const description = screen.getByText(
        'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
      );
      const type = screen.getByText('electric');

      expect(name).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(next).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(next).toBeDisabled();
      expect(prev).toBeDisabled();
    });
  });
});
