import {
  getPokemonsByPage,
  getRunningQueriesThunk,
} from '../../api/PokemonApi';

import { wrapper } from '../../store/store';
import PokemonPage from '../../components/PokemonPage';
import { Pokemon } from '../../api/types';

export default function AllPokemons({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <PokemonPage pokemons={pokemons} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const listId = parseInt(context.params?.pageId as string) || 1;
    const qty = parseInt(context.query?.qty as string) || 20;
    let pokemons: Pokemon[] = [];

    const newPokemons = await store.dispatch(
      getPokemonsByPage.initiate({ pageNum: listId, qty: qty })
    );
    pokemons = newPokemons.data ? newPokemons.data : [];

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        pokemons: pokemons,
      },
    };
  }
);
