import { Pokemon } from '../../api/types';
import PokemonCard from './PokemonCard';
import { Outlet } from 'react-router-dom';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="cardContainer">
          {pokemons.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemons.map((p) => <PokemonCard key={p.name} pokemon={p} />)
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}
