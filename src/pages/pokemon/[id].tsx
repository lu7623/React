import { GetServerSideProps } from 'next';
import { Pokemon } from '../../api/types';
import PokemonCard from '../components/PokemonCard';
import { getDetails, getPokemon } from '../../api/getPokemons';

interface PokemontProps {
  pokemon: Pokemon;
}

export default function PokemonFound({ pokemon }: PokemontProps) {
  return <PokemonCard pokemon={pokemon} />;
}

export const getServerSideProps: GetServerSideProps<{
  pokemon: Pokemon;
}> = async (context) => {
  const id = parseInt(context.params?.id as string) || 1;

  const pokemon = await getPokemon(String(id));
  const desc = await getDetails(pokemon);
  pokemon.description = desc;
  if (pokemon === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemon,
    },
  };
};
