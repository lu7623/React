import { useRouter } from 'next/router';
import { mockPokemon } from '../../api/mockPokemon';
import Details from '../components/Details';
import Pagination from '../components/Pagination';
import PokemonsList from '../components/PokemonsList';

export default function PokemonPage() {
  const pokes = [
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
    mockPokemon,
  ];
  const router = useRouter();
  const detailsId = router.query.details;
  return (
    <>
      <Pagination pokemons={pokes} />
      <PokemonsList pokemons={pokes} />
      {detailsId && <Details pokemon={mockPokemon} />}
    </>
  );
}
