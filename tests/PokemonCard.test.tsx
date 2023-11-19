import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonDetails from '../routes/PokemonDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonsList from '../routes/components/PokemonsList';
import PokemonCard from '../routes/components/PokemonCard';
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

const mockGetDetails = jest
  .fn()
  .mockReturnValue({
    data: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
    isLoading: false,
  });
beforeAll(() => {
  jest.mock('../../services/pokemonService', () => ({
    pokemonAPI: {
      useGetPokemonByNameQuery: jest
        .fn()
        .mockReturnValue({ data: mockPokemon, isLoading: false }),
      useGetPokemonDetailsQuery: () => mockGetDetails,
      useGetPokemonsByPageQuery: jest
        .fn()
        .mockReturnValue({
          isLoading: false,
          data: [{ name: mockPokemon.name, url: '' }],
        }),
    },
  }));
});

describe('Pokemon card view', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <PokemonCard pokemonName={mockPokemon.name} />
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
});

describe('Pokemon card behavior', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/page/1/']}>
        <Routes>
          <Route
            path="/page/1"
            element={<PokemonsList pokemonNames={[mockPokemon.name]} />}
          >
            <Route path="details/1" element={<PokemonDetails />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    const card = screen.getByTestId('card');

    await waitFor(() => {
      fireEvent.click(card);
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
      expect(mockGetDetails).toHaveBeenCalled();
    });
  });
  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    const btn = screen.getByTestId('card');

    fireEvent.click(btn);
    await waitFor(() => {
      expect(mockGetDetails).toHaveBeenCalled();
    });
  });
});
