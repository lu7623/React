import Pagination from './Pagination';
import PokemonsList from './PokemonsList';
import { Pokemon } from '../api/types';

export default function PokemonPage({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <Pagination pokemons={pokemons} />
      <PokemonsList pokemons={pokemons} />
    </>
  );
}
