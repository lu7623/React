import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonPage } from './PokemonPage';
import { mockPokemon } from '../api/mockPokemon';

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
