import PokemonCard from './PokemonCard';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function PokemonsList({
  pokemonNames,
}: {
  pokemonNames: string[];
}) {
  const navigate = useNavigate();
  const { pageId, detailsId } = useParams();
  const { search } = useLocation();
  const url = pageId ? `/page/${pageId}${search}` : '..';
  return (
    <>
      <div
        style={{ display: 'flex' }}
        onClick={() => {
          detailsId && navigate(url);
        }}
      >
        <div
          className="cardContainer"
          style={
            detailsId ? { opacity: '40%', width: '50%' } : { width: '100%' }
          }
        >
          {pokemonNames.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemonNames.map((p) => {
              return <PokemonCard key={p} pokemonName={p} />;
            })
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}
