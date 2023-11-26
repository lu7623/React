import { FetchMock } from 'jest-fetch-mock';
import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
import { mockPokemon } from '../../api/mockPokemon';
import Pokemons from './[pageId]';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('SSR page', () => {
  mockRouter.push('/page/1?qty=20');
  it('renders correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([mockPokemon, mockPokemon]));
    render(
      <Provider store={setupStore()}>
        <Pokemons />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );
    await waitFor(() => {
      expect(screen.getByText('next')).toBeInTheDocument();
    });
  });
});
