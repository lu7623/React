import { mockPokemon } from '../api/mockPokemon';
import Pagination from '../components/Pagination';

export default function Page() {
  return (
    <>
      <Pagination pokemons={[mockPokemon]} />
    </>
  );
}
