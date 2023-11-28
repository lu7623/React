import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading';

describe('Loading page', () => {
  it('renders loader', () => {
    render(<Loading />);

    const loader = screen.getByAltText('loading');

    expect(loader).toBeInTheDocument();
  });
});
