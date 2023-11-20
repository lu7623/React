import { mockPokemon } from '../api/mockPokemon';
import Details from './components/Details';
import Pagination from './components/Pagination';
import PokemonsList from './components/PokemonsList';

export default function Page() {
  const pokes = [mockPokemon];
  return (
    <>
      <Pagination pokemons={pokes} />
      <PokemonsList pokemons={pokes} />
      <Details pokemon={mockPokemon} />
    </>
  );
}
