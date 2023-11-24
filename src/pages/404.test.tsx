import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from './404';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  query: {
    pageId: '1',
    qty: '20',
  },
  back: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe('Not found page', () => {
  it('renders 404 page', () => {
    render(<NotFound />);

    const notFound = screen.getByText('404 Page Not Found');

    expect(notFound).toBeInTheDocument();
  });
  it('returns to previous page on Go back click', () => {
    render(<NotFound />);

    const back = screen.getByText('Go back');
    fireEvent.click(back);
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
