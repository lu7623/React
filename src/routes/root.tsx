import './App.css';
import { useState } from 'react';
import { Pokemon, PokemonRequest } from '../api/types';
import { getPokemon, getPokemons } from '../api/getPokemons';
import { useLoaderData, useNavigation } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PokemonsList from '../components/PokemonsList';
import Loading from '../components/Loading';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('search');
  if (q) {
    const pokemons = await fetchData(q);
    return { pokemons, q };
  } else {
    const pokemons = await fetchData('');
    return { pokemons, q };
  }
}

async function fetchData(searchStr: string): Promise<Pokemon[]> {
  try {
    if (searchStr === '') {
      const p = await getPokemons();
      return p;
    } else {
      const p = await getPokemon(searchStr);
      return [p];
    }
  } catch {
    return [];
  }
}

export function Root() {
  const [error, setError] = useState<Error>();
  const navigation = useNavigation();
  const { pokemons } = useLoaderData() as PokemonRequest;
  const showError = () => {
    setError(new Error('Some generated error'));
  };
  if (error) throw error;
  return (
    <>
      <div className="App">
        <div className="header">
          <div className="Logo"></div>
          <SearchForm />
          <div className="Img"></div>
        </div>
        {navigation.state === 'loading' ? (
          <Loading />
        ) : (
          <PokemonsList pokemons={pokemons} />
        )}
      </div>
      <button className="error" onClick={showError}>
        Error
      </button>
    </>
  );
}
