import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonPage from './PokemonPage';
import { mockPokemon } from '../../api/mockPokemon';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      pageId: '1',
      qty: '20',
    },
  }),
}));

jest.mock('../../hooks/custom', () => ({
  useAppDispatch: () => jest.fn(),
}));
jest.mock('../../store/reducers/perPageSlice', () => ({
  perPageSlice: {
    actions: { newLimit: jest.fn() },
  },
}));

describe('Pokemon page ', () => {
  it('Renders page with pagination and cards list correctly', async () => {
    render(<PokemonPage pokemons={[mockPokemon]} />);

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
