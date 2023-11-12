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
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../../routerConfig';
import NotFound from './NotFound';

const mockUseNavigate = jest.fn().mockReturnValue('');
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
  getDetails: jest.fn().mockReturnValue(''),
  getPokemon: () => fakeGetPokemons,
}));

describe('Not found page', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/blahblahblah'],
    });
    render(<RouterProvider router={router} />);

    const text = screen.getByText('404 Page Not Found');

    expect(text).toBeInTheDocument();
    expect(window.location.pathname).toEqual('/');
  });
  it('Clicking on Go back button returns to previous page.', async () => {
    render(<NotFound />);

    const back = screen.getByText('Go back');

    expect(back).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(back);
      expect(mockUseNavigate).toHaveBeenCalledWith('..');
    });
  });
});
