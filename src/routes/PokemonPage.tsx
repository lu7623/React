import { useSearchParams } from 'react-router-dom';
import { pokemonAPI } from '../services/pokemonService';
import Pagination from './components/Pagination';
import PokemonsList from './components/PokemonsList';
import { useAppSelector } from '../hooks/custom';

export function PokemonPage() {
  const searchStr = useAppSelector((state) => state.searchReducer.searchStr);
  const [searchParams] = useSearchParams();
  const qty = searchParams.get('qty');
  const { data } = pokemonAPI.useGetPokemonByNameQuery(searchStr);
  const pokemons = data ? [data] : [];
  return (
    <>
      <h1>{qty}</h1>
      <Pagination pokemons={pokemons} />
      <PokemonsList pokemons={pokemons} />
    </>
  );
}
