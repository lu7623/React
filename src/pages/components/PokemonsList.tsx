import { useRouter } from 'next/router';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../../api/types';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const router = useRouter();
  const detailsId = router.query.details;
  const pageId = router.query.pageId;
  return (
    <>
      <div
        style={{ display: 'flex' }}
        onClick={() => {
          detailsId && router.push(pageId ? `/page/${pageId}` : '/');
        }}
      >
        <div
          className="cardContainer"
          style={
            detailsId ? { opacity: '40%', width: '50%' } : { width: '100%' }
          }
        >
          {pokemons.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemons.map((p) => {
              return <PokemonCard key={p.name} pokemon={p} />;
            })
          )}
        </div>
      </div>
    </>
  );
}
