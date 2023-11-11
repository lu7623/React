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
import React from 'react';
import { Pokemon } from '../api/types';
import PokemonDetails from './PokemonDetails';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from './Root';
import PokemonsList from './components/PokemonsList';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLoaderData: jest.fn().mockReturnValue({
    details: {
      pokemon: mockPokemon,
      desc: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
    },
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: '',
  }),
  useLocation: jest.fn().mockReturnValue({
    search: '',
    pathname: '/page/1',
  }),
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
}));

jest.mock('../api/getPokemons', () => ({
  getDetails: jest
    .fn()
    .mockReturnValue(
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
    ),
}));
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
const fakeLoader = jest.fn().mockReturnValue(() => {});

describe('Pokemon card ', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <PokemonDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const name = screen.getByText('PIKACHU');
      const weight = screen.getByText('Weight: 1 kg');
      const description = screen.getByText(
        'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
      );
      const stats = screen.getByText('Stats:');

      expect(name).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(stats).toBeInTheDocument();
    });
  });
  it('Ensure that clicking the close button hides the component.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <pokemonsContext.Provider value={[mockPokemon]}>
          <Routes>
            <Route path="/page/1" element={<PokemonsList />}>
              <Route
                loader={fakeLoader}
                path="details/1"
                element={<PokemonDetails />}
              />
            </Route>
          </Routes>
        </pokemonsContext.Provider>
      </MemoryRouter>
    );

    const btn = screen.getByTestId('close');
    const details = screen.getByTestId('details');
    const pokemon = screen.getByAltText('pokemon');
    fireEvent.click(btn);
    await waitFor(() => {
      expect(details).not.toBeInTheDocument();
      expect(pokemon).toBeVisible();
    });
  });
});
