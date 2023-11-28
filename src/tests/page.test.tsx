import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
import { mockPokemonsArr } from '../api/mockPokemon';
import Main from '../pages/index';

describe('SSR pokemon page', () => {
  mockRouter.push('/?page=1&qty=20');
  it('renders correctly', async () => {
    render(
      <Provider store={setupStore()}>
        <Main pokemons={mockPokemonsArr} />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );
    expect(screen.getByText('next')).toBeInTheDocument();
    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
  });
});
