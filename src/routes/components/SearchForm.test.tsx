import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';

export class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(n: number) {
    return Object.keys(this.store)[n];
  }

  length: number = 0;
}

global.localStorage = new LocalStorageMock();

jest.mock('react-router-dom', () => ({
  useContext: jest.fn(),
  useParams: jest.fn().mockReturnValue({ pageId: '1' }),
  Outlet: () => {
    null;
  },
  Link: () => {
    null;
  },
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ search: '' }),
}));

describe('Search form ', () => {
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem('search', 'bulbasaur');
    render(<SearchForm callback={() => {}} />);

    await waitFor(() => {
      const bulbasaur = screen.getByDisplayValue('bulbasaur');

      expect(bulbasaur).toBeVisible();
    });
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<SearchForm callback={() => {}} />);

    const input = screen.getByRole('textbox');
    const submit = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(global.localStorage.getItem('search')).toBe('pikachu');
    });
  });
});
