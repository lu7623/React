import { render, screen } from '@testing-library/react';
import Custom500 from '../pages/500';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Server error', () => {
  it('renders 500 page', () => {
    render(<Custom500 />);

    const msg = screen.getByText('500 - Server-side error occurred');

    expect(msg).toBeInTheDocument();
  });
});
