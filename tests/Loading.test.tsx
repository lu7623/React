import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import Loading from '../routes/components/Loading';

describe('Loading page', () => {
  it('renders loader', () => {
    render(<Loading />);

    const loader = screen.getByAltText('loading');

    expect(loader).toBeInTheDocument();
  });
});
