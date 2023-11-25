import {
  getPokemonByName,
  getPokemonDetails,
  getRunningQueriesThunk,
  useGetPokemonDetailsQuery,
} from '../api/PokemonApi';

import { wrapper } from '../store/store';

import { useGetPokemonByNameQuery } from '../api/PokemonApi';

import PokemonPage from '../components/PokemonPage';
import Loading from '../components/Loading';
import { useAppSelector } from '../hooks/custom';

export default function Pokemon() {
  const { searchStr } = useAppSelector((state) => state.searchReducer);

  const result = useGetPokemonByNameQuery(searchStr);
  const { data: pokemon, isLoading } = result;
  const desc = useGetPokemonDetailsQuery(searchStr);
  const { data: description } = desc;
  const newPokemon = pokemon
    ? Object.assign({}, pokemon, { description: description })
    : null;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PokemonPage pokemons={newPokemon ? [newPokemon] : []} />
      )}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getPokemonByName.initiate(id));
      store.dispatch(getPokemonDetails.initiate(id));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
