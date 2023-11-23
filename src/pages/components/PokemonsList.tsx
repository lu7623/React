import PokemonCard from './PokemonCard';
import { useState } from 'react';
import { Pokemon } from '../../api/types';
import Details from './Details';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const [detailsPokemon, setDetailsPokemon] = useState<Pokemon | null>(null);
  const callback = (pokemon: Pokemon) => setDetailsPokemon(pokemon);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          className="cardContainer"
          style={
            detailsPokemon
              ? { opacity: '40%', width: '50%' }
              : { width: '100%' }
          }
          onClick={() => {
            detailsPokemon && setDetailsPokemon(null);
          }}
        >
          {pokemons.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemons.map((p) => {
              return (
                <PokemonCard key={p.name} pokemon={p} callback={callback} />
              );
            })
          )}
        </div>
        {detailsPokemon && (
          <Details
            pokemon={detailsPokemon}
            callback={() => setDetailsPokemon(null)}
          />
        )}
      </div>
    </>
  );
}
