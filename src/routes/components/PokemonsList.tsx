import { Pokemon } from '../../api/types';
import PokemonCard from './PokemonCard';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const navigate = useNavigate();
  const { pageId, detailsId } = useParams();
  const { search } = useLocation();
  const url = pageId ? `/page/${pageId}${search}` : '..';
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          className="cardContainer"
          onClick={() => {
            if (detailsId) navigate(url);
          }}
          style={
            detailsId ? { opacity: '40%', width: '50%' } : { width: '100%' }
          }
        >
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
