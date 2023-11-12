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
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Pokemon } from '../../api/types';
import PokemonDetails from '../PokemonDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from '../Root';
import PokemonsList from './PokemonsList';
import PokemonCard from './PokemonCard';

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
jest.mock('../../api/getPokemons', () => ({
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
  getPokemon: () => fakeGetPokemons,
}));

describe('Pokemon card ', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>
    );

    await waitFor(() => {
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
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <pokemonsContext.Provider value={[mockPokemon]}>
          <Routes>
            <Route path="/page/1" element={<PokemonsList />}>
              <Route path="details/1" element={<PokemonDetails />} />
            </Route>
          </Routes>
        </pokemonsContext.Provider>
      </MemoryRouter>
    );

    const card = screen.getByTestId('card');

    await waitFor(() => {
      fireEvent.click(card);
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      expect(fakeGetPokemons).toHaveBeenCalled();
    });
  });
  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <pokemonsContext.Provider value={[mockPokemon]}>
          <Routes>
            <Route path="/page/1" element={<PokemonsList />}>
              <Route path="details/1" element={<PokemonDetails />} />
            </Route>
          </Routes>
        </pokemonsContext.Provider>
      </MemoryRouter>
    );

    const btn = screen.getByTestId('card');

    fireEvent.click(btn);
    await waitFor(() => {
      expect(fakeGetPokemons).toHaveBeenCalled();
    });
  });
});
