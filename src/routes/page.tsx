import { PokemonRequest } from '../api/types';
import {
  useLoaderData,
  LoaderFunctionArgs,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import PokemonCard from './components/PokemonCard';
import { getDetails, getPokemon, getPokemonPage } from '../api/getPokemons';
import { PokemonDetails } from './Details';
import Loading from './components/Loading';
import Pagination from './pagination';

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
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
  const { pokemons, details } = useLoaderData() as PokemonRequest;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  return (
    <>
      <Pagination />
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        <div style={{ display: 'flex' }}>
          <div
            className="cardContainer"
            onClick={() => {
              if (searchParams.has('details')) {
                searchParams.delete('details');
                setSearchParams(searchParams);
              }
            }}
            style={
              details?.pokemon
                ? { width: '50%', opacity: '40%' }
                : { width: '100%' }
            }
          >
            {pokemons.length === 0 ? (
              <p>No results found</p>
            ) : (
              pokemons.map((p) => <PokemonCard key={p.name} pokemon={p} />)
            )}
          </div>
          {details?.pokemon ? <PokemonDetails /> : null}
        </div>
      )}
    </>
  );
}
