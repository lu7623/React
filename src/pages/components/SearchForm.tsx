import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/custom';
import { searchSlice } from '../../store/reducers/searchSlice';
import { useRouter } from 'next/router';

export default function SearchForm() {
  const { searchStr } = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  const { newSearch } = searchSlice.actions;
  const router = useRouter();
  const [search, setSearch] = useState(searchStr);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('search', search);
    dispatch(newSearch(search));
    search === '' ? router.push('/page/1') : router.push('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="find"
          id="find"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
        <p>
          You can type pokemon name (e.g. pikachu or bulbasaur) or number 1-1010
        </p>
      </form>
    </>
  );
}
