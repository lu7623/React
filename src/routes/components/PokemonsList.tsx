import { Pokemon } from '../../api/types';
import { PokemonDetails } from '../Details';

import PokemonCard from './PokemonCard';
import { useSearchParams } from 'react-router-dom';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('details');

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          className="cardContainer"
          onClick={() => {
            if (searchParams.has('details')) {
              searchParams.delete('details');
              setSearchParams(searchParams);
            }
          }}
          style={
            q
              ? { width: '50%', opacity: '40%', cursor: 'pointer' }
              : { width: '100%' }
          }
        >
          {pokemons.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemons.map((p) => <PokemonCard key={p.name} pokemon={p} />)
          )}
        </div>
        {q ? <PokemonDetails /> : null}
      </div>
    </>
  );
}
