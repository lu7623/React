import { mockPokemon } from '../../api/mockPokemon';
import Pagination from '../../components/Pagination';
import PokemonsList from '../../components/PokemonsList';

export default function PokemonPage() {
  return (
    <>
      <Pagination
        pokemons={[
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
          mockPokemon,
        ]}
      />
      <PokemonsList pokemonNames={['2']} />
    </>
  );
}
