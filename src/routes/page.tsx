import { PokemonRequest } from '../api/types';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { getDetails, getPokemon, getPokemonPage } from '../api/getPokemons';
import Pagination from './components/pagination';
import PokemonsList from './components/PokemonsList';

export async function detailsLoader({ request, params }: LoaderFunctionArgs) {
  const pageNum = params.pageId;
  const url = new URL(request.url);
  const q = url.searchParams.get('qty');
  const det = url.searchParams.get('details');
  if (q) {
    const pokemons = await getPokemonPage(Number(pageNum), Number(q));
    if (det) {
      const pokemon = await getPokemon(det);
      const desc = await getDetails(pokemon);
      const details = { pokemon, desc };
      return { pokemons, details };
    }
    return { pokemons };
  } else {
    const pokemons = await getPokemonPage(Number(pageNum), 20);
    if (det) {
      const pokemon = await getPokemon(det);
      const desc = await getDetails(pokemon);
      const details = { pokemon, desc };
      return { pokemons, details };
    }
    return { pokemons };
  }
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
