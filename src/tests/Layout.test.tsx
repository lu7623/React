import { render, screen } from '@testing-library/react';
import Layout from '../components/Layout';
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
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

jest.mock('../hooks/custom', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn().mockReturnValue({ qty: '20', searchStr: '' }),
}));

describe('Layout', () => {
  it('renders app layout correctly', () => {
    render(<Layout />);

    const error = screen.getByText('Error');
    const search = screen.getByText('Search');
    expect(error).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
});
