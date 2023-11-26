import { FetchMock } from 'jest-fetch-mock';
import { render, screen } from '@testing-library/react';
import Pokemon from '../pages/pokemon/[id]';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
import { mockPokemon } from '../api/mockPokemon';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('SSR page', () => {
  mockRouter.push('/pokemon/2');
  it('renders correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemon));
    render(
      <Provider store={setupStore()}>
        <Pokemon />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );
    expect(screen.getByText('next')).toBeInTheDocument();
  });
});
