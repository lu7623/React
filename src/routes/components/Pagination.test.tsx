const pokemons: Pokemon[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    name: 'Caterpie',
    id: 2,
    height: 10,
    weight: 10,
    sprites: { front_default: '', back_default: '' },
    species: { name: '', url: '' },
    types: [{ slot: 1, type: { name: 'normal', url: '' } }],
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
  },
];
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { pokemonsContext } from '../root';
import Pagination from './pagination';
import { Pokemon } from '../../api/types';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useParams: jest.fn().mockReturnValue({
    pageId: '1',
  }),
}));

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

describe('Pagination ', () => {
  it('pagination renders correctly', async () => {
    render(
      <pokemonsContext.Provider value={pokemons}>
        <Pagination />
      </pokemonsContext.Provider>
    );
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
    render(
      <pokemonsContext.Provider value={pokemons}>
        <Pagination />
      </pokemonsContext.Provider>
    );

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
    render(
      <pokemonsContext.Provider value={pokemons}>
        <Pagination />
      </pokemonsContext.Provider>
    );
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
