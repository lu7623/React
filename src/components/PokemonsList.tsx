import { useRouter } from 'next/router';
import { pokemonAPI } from '../services/pokemonService';
import PokemonCard from './PokemonCard';

export default function PokemonsList({
  pokemonNames,
}: {
  pokemonNames: string[];
}) {
  const router = useRouter();

  const { error } = pokemonAPI.useGetPokemonByNameQuery(pokemonNames[0]);
  const detailsId = router.query.detailsId;
  return (
    <>
      <div style={{ display: 'flex' }} onClick={() => {}}>
        <div
          className="cardContainer"
          style={
            detailsId ? { opacity: '40%', width: '50%' } : { width: '100%' }
          }
        >
          {error ? (
            <p>No results found</p>
          ) : (
            pokemonNames.map((p) => {
              return <PokemonCard key={p} pokemonName={p} />;
            })
          )}
        </div>
      </div>
    </>
  );
}
