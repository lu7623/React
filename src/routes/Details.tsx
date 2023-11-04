import { Pokemon, PokemonDesc, PokemonRequest } from '../api/types';
import { getPokemon } from '../api/getPokemons';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from './components/Loading';

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

export function PokemonDetails() {
  const { details } = useLoaderData() as PokemonRequest;
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === 'loading' ? (
        <Loading />
      ) : (
        details && (
          <div className="details">
            <h2>{details.pokemon.name.toUpperCase()}</h2>
            <h3>
              Type:
              {details.pokemon.types.map((type) => (
                <span className="type" key={type.type.name}>
                  {type.type.name}
                </span>
              ))}
            </h3>
            <h4 className="size">Height: {details.pokemon.height / 10} m</h4>
            <h4 className="size">Weight: {details.pokemon.weight / 10} kg</h4>
            <div style={{ display: 'flex' }}>
              <img
                src={details.pokemon.sprites.front_default}
                alt="pokemon"
                width={150}
              />
              <img
                src={details.pokemon.sprites.back_default}
                alt="pokemon"
                width={150}
              />
            </div>
            <p>{details.desc ? details.desc : ''}</p>
            <h3>
              Stats:
              {details.pokemon.stats.map((stat) => (
                <div className="type" key={stat.stat.name}>
                  {stat.stat.name} - {stat.base_stat}
                </div>
              ))}
            </h3>
          </div>
        )
      )}
    </>
  );
}
