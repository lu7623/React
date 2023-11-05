import './App.css';
import { useState, useEffect } from 'react';
import { Pokemon } from '../api/types';
import { getPokemon, getPokemonPage, getPokemons } from '../api/getPokemons';
import { LoaderFunctionArgs, Outlet, useNavigate } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PokemonsList from './components/PokemonsList';

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
  const pageNum = params.pageId;
  const url = new URL(request.url);
  const q = url.searchParams.get('qty');
  if (q) {
    const { pokemons, max } = await getPokemonPage(Number(pageNum), Number(q));
    return { pokemons, max };
  } else {
    const { pokemons, max } = await getPokemonPage(Number(pageNum), 20);
    return { pokemons, max };
  }
}

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
  }, [search, navigate]);

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
