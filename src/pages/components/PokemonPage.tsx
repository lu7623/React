import Pagination from '../components/Pagination';
import PokemonsList from '../components/PokemonsList';
import { Pokemon } from '../../api/types';

export default function PokemonPage({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <Pagination pokemons={pokemons} />
      <PokemonsList pokemons={pokemons} />
    </>
  );
}
