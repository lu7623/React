import { DetailsRequest, Pokemon, PokemonDesc } from '../api/types';
import { getPokemon } from '../api/getPokemons';
import { useNavigation } from 'react-router-dom';
import Loading from '../components/Loading';

async function getDescription(pokemon: Pokemon): Promise<string> {
  const desc = fetch(pokemon.species.url)
    .then((response) => response.json())
    .then((data) => {
      const description = data.flavor_text_entries
        .filter((item: PokemonDesc) => {
          return item.language.name === 'en';
        })[0]
        .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
      return description;
    });
  return desc;
}

export async function pokemonLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('details');
  if (q) {
    const pokemon = await getPokemon(q);
    const desc = await getDescription(pokemon);
    return { pokemon, q, desc };
  }
}

export function PokemonDetails({ pokemon, desc }: DetailsRequest) {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        <div className="details">
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
          <div style={{ display: 'flex' }}>
            <img
              src={pokemon.sprites.front_default}
              alt="pokemon"
              width={150}
            />
            <img src={pokemon.sprites.back_default} alt="pokemon" width={150} />
          </div>
          <p>{desc ? desc : ''}</p>
          <h3>
            Stats:
            {pokemon.stats.map((stat) => (
              <div className="type" key={stat.stat.name}>
                {stat.stat.name} - {stat.base_stat}
              </div>
            ))}
          </h3>
        </div>
      )}
    </>
  );
}
