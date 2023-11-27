import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
import { mockPokemon } from '../api/mockPokemon';
import SinglePokemon from '../pages/pokemon/[id]';

describe('Single pokemon page', () => {
  mockRouter.push('/pokemon/2');
  it('renders correctly', async () => {
    render(
      <Provider store={setupStore()}>
        <SinglePokemon pokemon={mockPokemon} pokemonDesc="" />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );
    expect(screen.getByText('next')).toBeInTheDocument();
    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
  });
});
