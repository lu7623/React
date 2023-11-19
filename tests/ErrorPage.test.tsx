import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorPage from '../routes/ErrorPage';

describe('Loading page', () => {
  it('renders error page', () => {
    const routes = [
      {
        path: '/',
        element: <ErrorPage />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const msg = screen.getByText('Something went wrong');

    expect(msg).toBeInTheDocument();
  });
});
