import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
