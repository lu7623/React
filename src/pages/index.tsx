import {
  getPokemonByName,
  getPokemonsByPage,
  getRunningQueriesThunk,
} from '../api/PokemonApi';

import { wrapper } from '../store/store';
import PokemonPage from '../components/PokemonPage';
import { Pokemon } from '../api/types';

export default function Main({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <PokemonPage pokemons={pokemons} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, page, qty } = context.query;

    let pokemons: Pokemon[] = [];

    if (typeof page === 'string' && typeof qty === 'string') {
      const newPokemons = await store.dispatch(
        getPokemonsByPage.initiate({ pageNum: Number(page), qty: Number(qty) })
      );
      pokemons = newPokemons.data ? newPokemons.data : [];
    }

    if (typeof search === 'string') {
      const newPokemon = await store.dispatch(
        getPokemonByName.initiate(search)
      );
      pokemons = newPokemon.data ? [newPokemon.data] : [];
    }

    if (!search && !page && !qty) {
      const newPokemons = await store.dispatch(
        getPokemonsByPage.initiate({ pageNum: 1, qty: 20 })
      );
      pokemons = newPokemons.data ? newPokemons.data : [];
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        pokemons: pokemons,
      },
    };
  }
);
