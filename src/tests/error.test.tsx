import '@testing-library/jest-dom';
import NotFound from '../pages/404';
import MyApp from '../pages/_app';
import { Router } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('NotFound component', () => {
  it('renders 404 component when navigating to an invalid route', async () => {
    const mockRouter = {
      route: '/invalid-route',
      pathname: '/invalid-route',
      query: {},
      asPath: '/invalid-route',
      push: jest.fn(),
    } as unknown as Router;

    useRouter.mockImplementation(() => ({
      asPath: '/invalid-route',

      on: jest.fn(),
      off: jest.fn(),
      push: jest.fn(),
    }));

    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <MyApp Component={NotFound} pageProps={{}} router={mockRouter} />
        </RouterContext.Provider>
      );
    });

    const errorPage = screen.getByText('404 Page Not Found');

    expect(errorPage).toBeInTheDocument();
  });
});
