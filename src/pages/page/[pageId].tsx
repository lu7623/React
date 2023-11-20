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
  return (
    <>
      <Pagination pokemons={pokes} />
      <PokemonsList pokemons={pokes} />
      <Details pokemon={mockPokemon} />
    </>
  );
}
