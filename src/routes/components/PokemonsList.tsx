import { Pokemon } from '../../api/types';
import Loading from './Loading';
import PokemonCard from './PokemonCard';
import {
  Outlet,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export default function PokemonsList({ pokemons }: { pokemons: Pokemon[] }) {
  const navigation = useNavigation();
  const { detailsId } = useParams();
  const [searchParams] = useSearchParams();
  const num = searchParams.get('qty');
  const qty = num ? Number(num) : 2;
  return (
    <>
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        <div style={{ display: 'flex' }}>
          <div
            className="cardContainer"
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
