import {
  getPokemonByName,
  getPokemonDetails,
  getRunningQueriesThunk,
} from '../../api/PokemonApi';

import { wrapper } from '../../store/store';
import PokemonPage from '../../components/PokemonPage';
import { Pokemon } from '../../api/types';

export default function SinglePokemon({
  pokemon,
  pokemonDesc,
}: {
  pokemon: Pokemon;
  pokemonDesc: string;
}) {
  const newPokemon = pokemon
    ? Object.assign({}, pokemon, { description: pokemonDesc })
    : null;
  return (
    <>
      <PokemonPage pokemons={newPokemon ? [newPokemon] : []} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    let pokemon: Pokemon | null = null;
    let pokemonDesc: string | null = null;
    if (typeof id === 'string') {
      const newPokemon = await store.dispatch(getPokemonByName.initiate(id));
      const newPokemondesc = await store.dispatch(
        getPokemonDetails.initiate(id)
      );
      pokemon = newPokemon.data ? newPokemon.data : null;
      pokemonDesc = newPokemondesc.data ? newPokemondesc.data : '';
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        pokemon: pokemon,
        pokemonDesc: pokemonDesc,
      },
    };
  }
);
