import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockPokemonsArr } from '../api/mockPokemon';
import Pagination from './Pagination';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  query: {
    pageId: '1',
    qty: '20',
  },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

jest.mock('../../hooks/custom', () => ({
  useAppDispatch: () => jest.fn(),
}));
jest.mock('../../store/reducers/perPageSlice', () => ({
  perPageSlice: {
    actions: { newLimit: jest.fn() },
  },
}));

describe('Pagination ', () => {
  it('pagination renders correctly', async () => {
    render(<Pagination pokemons={mockPokemonsArr} />);
    const cardsPerPage = screen.getByText('Cards per page');
    const next = screen.getByText('next');
    const prev = screen.getByText('prev');
    await waitFor(() => {
      expect(cardsPerPage).toBeInTheDocument();
      expect(next).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
    });
  });
  it('Component updates URL query parameter when number per page changes', async () => {
    render(<Pagination pokemons={mockPokemonsArr} />);

    const perPage10 = screen.getByLabelText('10');
    fireEvent.click(perPage10);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/page/1?qty=10');
    });
  });
  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(<Pagination pokemons={[]} />);
    const next = screen.getByText('next');
    const prev = screen.getByText('prev');
    fireEvent.click(next);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/page/2?qty=20');

      expect(prev).toBeDisabled();
    });
  });
});
