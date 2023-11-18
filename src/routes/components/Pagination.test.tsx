import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { pokemonsContext } from '../Root0000';
import Pagination from './Pagination0000';
import { Pokemon } from '../../api/types';
import { mockPokemon } from '../../api/mockPokemon';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
beforeEach(() => {
  const pokemons: Pokemon[] = [
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
  ];
  render(
    <pokemonsContext.Provider value={pokemons}>
      <Pagination />
    </pokemonsContext.Provider>
  );
});

describe('Pagination ', () => {
  it('pagination renders correctly', async () => {
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
    const perPage40 = screen.getByText('40');
    const perPage10 = screen.getByText('10');

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/page/1?qty=20');

      fireEvent.click(perPage10);
      expect(mockUseNavigate).toHaveBeenCalledWith('/page/1?qty=10');

      fireEvent.click(perPage40);
      expect(mockUseNavigate).toHaveBeenCalledWith('/page/1?qty=40');
    });
  });
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const next = screen.getByText('next');
    const prev = screen.getByText('prev');

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/page/1?qty=20');

      fireEvent.click(next);
      expect(mockUseNavigate).toHaveBeenCalledWith('/page/2?qty=20');

      expect(prev).toBeDisabled();
    });
  });
});
