import { Pokemon } from '../api/types';

export default function PokemonCard({
  pokemon,
  callback,
}: {
  pokemon: Pokemon;
  callback: (pokemon: Pokemon) => void;
}) {
  return (
    <>
      <div
        className="card"
        data-testid="card"
        onClick={() => callback(pokemon)}
      >
        <h2>{pokemon.name.toUpperCase()}</h2>
        <h3>
          Type:
          {pokemon?.types.map((type) => (
            <span className="type" key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </h3>
        <h4 className="size">Height: {pokemon ? pokemon.height / 10 : 1} m</h4>
        <h4 className="size">Weight: {pokemon ? pokemon.weight / 10 : 1} kg</h4>
        <img
          src={
            pokemon?.sprites.front_default
              ? pokemon?.sprites.front_default
              : '/notAvaliable.jpg'
          }
          alt="pokemon"
          width={150}
        />
        <p>{pokemon.description}</p>
      </div>
    </>
  );
}
