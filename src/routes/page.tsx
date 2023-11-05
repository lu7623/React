import { PokemonRequest } from '../api/types';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { getDetails, getPokemon } from '../api/getPokemons';
import Pagination from './components/pagination';
import PokemonsList from './components/PokemonsList';

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const det = params.detailsId;
  if (det) {
    const pokemon = await getPokemon(det);
    const desc = await getDetails(pokemon);
    const details = { pokemon, desc };
    return { details };
  } else return null;
}

export function PokemonPage() {
  const { pokemons } = useLoaderData() as PokemonRequest;
  return (
    <>
      <Pagination />
      <PokemonsList pokemons={pokemons} />
    </>
  );
}
