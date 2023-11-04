import './App.css';
import { useState, useEffect } from 'react';
import { Pokemon } from '../api/types';
import { getPokemon, getPokemons } from '../api/getPokemons';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PokemonsList from './components/PokemonsList';

export function Root() {
  const searchText = localStorage.getItem('search');
  const [search, setSearch] = useState(searchText ? searchText : '');
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();
  async function fetchData(searchStr: string) {
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
  }
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchData(search);
    if (search === '') navigate('/page/1');
    else navigate('/');
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
        {pokemons.length > 1 ? (
          <Outlet />
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
