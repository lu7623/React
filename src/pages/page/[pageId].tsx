import { GetServerSideProps } from 'next';
import { Pokemon } from '../../api/types';
import { getDetails, getPokemonPage } from '../../api/getPokemons';
import PokemonPage from '../components/PokemonPage';

interface PokemonsProps {
  pokemons: Pokemon[];
}

export default function PokemonFound({ pokemons }: PokemonsProps) {
  return <PokemonPage pokemons={pokemons} />;
}

export const getServerSideProps: GetServerSideProps<{
  pokemons: Pokemon[];
}> = async (context) => {
  const listId = parseInt(context.params?.pageId as string) || 1;
  const qty = parseInt(context.query?.qty as string) || 1;
  const { pokemons } = await getPokemonPage(listId, Number(qty));
  for (const pokemon of pokemons) {
    const desc = await getDetails(pokemon);
    pokemon.description = desc;
  }

  return {
    props: {
      pokemons,
    },
  };
};
