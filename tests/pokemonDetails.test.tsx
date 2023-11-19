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
import { Pokemon } from '../api/types';
import PokemonDetails from '../routes/PokemonDetails';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { pokemonsContext } from '../routes/Root';
import PokemonsList from '../routes/components/PokemonsList';

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

describe('Pokemon details ', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <PokemonDetails />
      </BrowserRouter>
    );
    const loader = screen.getByAltText('loading');
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      const name = screen.getByText('PIKACHU');
      expect(name).toBeInTheDocument();
    });
  });
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
              <Route path="details/1" element={<PokemonDetails />} />
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
  it('Ensure that clicking the close button hides the component.', async () => {
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
