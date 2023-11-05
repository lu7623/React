import { Pokemon } from '../../api/types';
import Loading from './Loading';
import PokemonCard from './PokemonCard';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { pageId, detailsId } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const num = searchParams.get('qty');
  const qty = num ? Number(num) : 2;
  const url = pageId ? `/page/${pageId}${search}` : '..';
  return (
    <>
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
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
              pokemons.map((p, i) => {
                if (i < qty) return <PokemonCard key={p.name} pokemon={p} />;
              })
            )}
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}
