import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
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

jest.mock('../../hooks/custom', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => jest.fn(),
}));
jest.mock('../../store/reducers/perPageSlice', () => ({
  perPageSlice: {
    actions: { newLimit: jest.fn() },
  },
}));

describe('Search form ', () => {
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem('search', 'bulbasaur');
    render(<SearchForm />);

    await waitFor(() => {
      const bulbasaur = screen.getByDisplayValue('bulbasaur');

      expect(bulbasaur).toBeVisible();
    });
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<SearchForm />);

    const input = screen.getByRole('textbox');
    const submit = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(global.localStorage.getItem('search')).toBe('pikachu');
    });
  });
});
