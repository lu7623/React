import { GetServerSideProps } from 'next';
import { Pokemon } from '../../api/types';
import { getDetails, getPokemon } from '../../api/getPokemons';
import PokemonPage from '../../components/PokemonPage';

interface PokemontProps {
  pokemon: Pokemon;
}

export default function PokemonFound({ pokemon }: PokemontProps) {
  return <PokemonPage pokemons={[pokemon]} />;
}

export const getServerSideProps: GetServerSideProps<{
  pokemon: Pokemon;
}> = async (context) => {
  const id = context.params?.id as string;
  const pokemon = await getPokemon(String(id));
  if (pokemon === null) {
    return {
      notFound: true,
    };
  }
  const desc = await getDetails(pokemon);
  pokemon.description = desc;

  return {
    props: {
      pokemon,
    },
  };
};
