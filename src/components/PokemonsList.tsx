import { Pokemon } from '../api/types';
import PokemonCard from './PokemonCard';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <div className="cardContainer">
      {pokemons.length === 0 ? (
        <p>No results found</p>
      ) : (
        pokemons.map((p) => <PokemonCard key={p.name} pokemon={p} />)
      )}
    </div>
  );
}
