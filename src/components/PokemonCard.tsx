import { Link, useLocation } from 'react-router-dom';
import { pokemonAPI } from '../services/pokemonService';
import Loading from './Loading';

export default function PokemonCard({ pokemonName }: { pokemonName: string }) {
  const { isLoading, data: pokemon } =
    pokemonAPI.useGetPokemonByNameQuery(pokemonName);
  const { data: desc } = pokemonAPI.useGetPokemonDetailsQuery(
    pokemon ? pokemon.name : ''
  );
  const { pathname, search } = useLocation();
  const url = `${pathname}/details/${pokemon?.id}${search}`;
  return (
    <>
      <Link to={url}>
        <div className="card" data-testid="card">
          {isLoading ? (
            <Loading />
          ) : (
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
              <p>{desc}</p>
            </>
          )}
        </div>
      </Link>
    </>
  );
}
