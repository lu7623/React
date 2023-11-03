import { Form, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { PokemonRequest } from '../../api/types';

export default function SearchForm() {
  const { q } = useLoaderData() as PokemonRequest;
  useEffect(() => {
    const input = document.getElementById('q') as HTMLInputElement;
    input.value = q;
  }, [q]);

  return (
    <>
      <Form id="search-form" role="search">
        <input id="q" defaultValue={q} name="search" type="search" />
        <button type="submit">Search</button>
        <p>
          You can type pokemon name (e.g. pikachu or bulbasaur) or number 1-1010
        </p>
      </Form>
    </>
  );
}
