import { useRouter } from 'next/router';
import { mockPokemon } from '../../api/mockPokemon';
import Details from '../components/Details';
import Pagination from '../components/Pagination';
import PokemonsList from '../components/PokemonsList';
import { Pokemon } from '../../api/types';

export default function PokemonPage({ pokemons }: { pokemons: Pokemon[] }) {
  const router = useRouter();
  const detailsId = router.query.details;
  return (
    <>
      <Pagination pokemons={pokemons} />
      <PokemonsList pokemons={pokemons} />
      {detailsId && <Details pokemon={mockPokemon} />}
    </>
  );
}
