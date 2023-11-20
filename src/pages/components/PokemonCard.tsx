import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pokemon } from '../../api/types';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();
  const pageId = router.query.pageId;
  const url = pageId
    ? `/page/${pageId}?details=${pokemon?.id}`
    : `/?details=${pokemon?.id}`;
  return (
    <>
      <Link href={url}>
        <div className="card" data-testid="card">
          <>
            <h2>{pokemon?.name.toUpperCase()}</h2>
            <h3>
              Type:
              {pokemon?.types.map((type) => (
                <span className="type" key={type.type.name}>
                  {type.type.name}
                </span>
              ))}
            </h3>
            <h4 className="size">
              Height: {pokemon ? pokemon.height / 10 : 1} m
            </h4>
            <h4 className="size">
              Weight: {pokemon ? pokemon.weight / 10 : 1} kg
            </h4>
            <img
              src={
                pokemon?.sprites.front_default
                  ? pokemon?.sprites.front_default
                  : '/notAvaliable.jpg'
              }
              alt="pokemon"
              width={150}
            />
          </>
        </div>
      </Link>
    </>
  );
}
