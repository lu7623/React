import { useContext } from 'react';
import PokemonCard from './PokemonCard';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { pokemonsContext } from '../root';

export default function PokemonsList() {
  const pokemons = useContext(pokemonsContext);
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
          {pokemons.length === 0 ? (
            <p>No results found</p>
          ) : (
            pokemons.map((p) => {
              return <PokemonCard key={p.name} pokemon={p} />;
            })
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}
