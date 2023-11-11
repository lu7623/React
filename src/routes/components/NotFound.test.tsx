import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import NotFound from './NotFound';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));
describe('Not found page', () => {
  it('renders 404', () => {
    render(<NotFound />);

    const text = screen.getByText('404 Page Not Found');

    expect(text).toBeInTheDocument();
  });
});
