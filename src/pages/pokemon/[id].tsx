import {
  getPokemonByName,
  getPokemonDetails,
  getRunningQueriesThunk,
  useGetPokemonDetailsQuery,
} from '../../api/PokemonApi';

import { wrapper } from '../../store/store';

import { useGetPokemonByNameQuery } from '../../api/PokemonApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/dist/client/router';
import PokemonPage from '../../components/PokemonPage';
import Loading from '../../components/Loading';

export default function Pokemon() {
  const router = useRouter();
  const id = router.query.id;
  const result = useGetPokemonByNameQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );
  const { data: pokemon, isLoading } = result;
  const desc = useGetPokemonDetailsQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );
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
