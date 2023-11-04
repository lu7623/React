import './App.css';
import { useState, useEffect } from 'react';
import { Pokemon } from '../api/types';
import Loading from './Loading';
import { getPokemon, getPokemons } from '../api/getPokemons';
import PokemonsList from '../routes/components/PokemonsList';
import SearchForm from './SearchForm';

export default function App() {
  const searchText = localStorage.getItem('search');
  const [search, setSearch] = useState(searchText ? searchText : '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  async function fetchData(searchStr: string) {
    setIsLoading(true);
    try {
      if (searchStr === '') {
        const p = await getPokemons();
        setPokemons(p);
      } else {
        const p = await getPokemon(searchStr);
        setPokemons([p]);
      }
    } catch {
      setPokemons([]);
    }
    setIsLoading(false);
  }
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const handleForm = (str: string) => {
    setSearch(str);
    localStorage.setItem('search', str);
    const searchStr = str.toLowerCase().trim();
    fetchData(searchStr);
  };

  const showError = () => {
    setError(new Error('Some generated error'));
  };
  if (error) throw error;
  return (
    <>
      <div className="App">
        <div className="header">
          <div className="Logo"></div>
          <SearchForm callback={handleForm} searchText={search} />

          <div className="Img"></div>
        </div>
        {isLoading ? <Loading /> : <PokemonsList pokemons={pokemons} />}
      </div>
      <button className="error" onClick={showError}>
        Error
      </button>
    </>
  );
}
