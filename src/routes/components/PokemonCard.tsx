import { useEffect, useState } from 'react';
import { Pokemon, PokemonDesc } from '../../api/types';
import { useSearchParams } from 'react-router-dom';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [desc, setDesc] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  function getDescription(pokemon: Pokemon) {
    fetch(pokemon.species.url)
      .then((response) => response.json())
      .then((data) => {
        const description = data.flavor_text_entries
          .filter((item: PokemonDesc) => {
            return item.language.name === 'en';
          })[0]
          .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
        setDesc(description);
      });
  }
  useEffect(() => {
    getDescription(pokemon);
  }, [desc]);

  return (
    <div
      className="card"
      onClick={() => {
        searchParams.set('details', `${pokemon.id}`);
        setSearchParams(searchParams);
      }}
    >
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
      <img src={pokemon.sprites.front_default} alt="pokemon" width={150} />
      <p>{desc}</p>
    </div>
  );
}
