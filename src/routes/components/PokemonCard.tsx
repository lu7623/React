import { useEffect, useState } from 'react';
import { Pokemon } from '../../api/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDetails } from '../../api/getPokemons';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [desc, setDesc] = useState('');
  const { pathname, search } = useLocation();
  const url = `${pathname}/details/${pokemon.id}${search}`;
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(pokemon: Pokemon) {
      const data = await getDetails(pokemon);
      setDesc(data);
    }

    fetchData(pokemon);
  }, [desc, pokemon]);

  return (
    <div className="card" onClick={() => navigate(url)}>
      <h2>{pokemon.name.toUpperCase()}</h2>
      <h3>
        Type:
        {pokemon.types.map((type) => (
          <span className="type" key={type.type.name}>
            {type.type.name}
          </span>
        ))}
      </h3>
      <h4 className="size">Height: {pokemon.height / 10} m</h4>
      <h4 className="size">Weight: {pokemon.weight / 10} kg</h4>
      <img
        src={
          pokemon.sprites.front_default
            ? pokemon.sprites.front_default
            : '/notAvaliable.jpg'
        }
        alt="pokemon"
        width={150}
      />
      <p>{desc}</p>
    </div>
  );
}
