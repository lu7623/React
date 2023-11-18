import { mockPokemon } from '../api/mockPokemon';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { Root } from './Root0000';
import { routerConfig } from '../routerConfig';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
}));

jest.mock('../api/getPokemons', () => ({
  getDetails: jest.fn().mockReturnValue(''),
  getPokemonPage: jest
    .fn()
    .mockReturnValue({ pokemons: [mockPokemon], max: 1200 }),
  getPokemon: () => jest.fn().mockReturnValue(mockPokemon),
}));

describe('Root ', () => {
  it('Renders root page correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>
    );

    await waitFor(() => {
      const next = screen.getByText('next');
      const prev = screen.getByText('prev');
      const name = screen.getByText('PIKACHU');
      const weight = screen.getByText('Weight: 1 kg');
      const type = screen.getByText('electric');

      expect(name).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(next).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(next).toBeDisabled();
      expect(prev).toBeDisabled();
    });
  });
  it('Renders error page', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/page/1?qty=20'],
    });
    render(<RouterProvider router={router} />);

    const error = screen.getByText('Error');
    await waitFor(() => {
      fireEvent.click(error);

      const msg = screen.getByText('Something went wrong');

      expect(msg).toBeInTheDocument();
    });
  });
});
