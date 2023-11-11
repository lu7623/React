import { Pokemon, PokemonDesc, PokemonType } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemon(searchStr: string): Promise<Pokemon> {
  const newPokemon = await fetch(`${BASE_URL}/${searchStr}`).then((response) =>
    response.json()
  );
  return newPokemon;
}

export async function getPokemons(): Promise<Pokemon[]> {
  const p = await fetch(`${BASE_URL}?limit=20&offset=1`).then((response) =>
    response.json()
  );
  const urls = p.results.map((res: PokemonType) => res.url);
  const res: Pokemon[] = [];
  for (const url of urls) {
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          const promise2 = response.json();
          promise2.then((json) => {
            res.push(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
  return res;
}

interface PokemonPages {
  pokemons: Pokemon[];
  max: string;
}

export async function getPokemonPage(
  pageNum: number,
  qty: number
): Promise<PokemonPages> {
  const p = await fetch(
    `${BASE_URL}?limit=${qty + 1}&offset=${(pageNum - 1) * qty}`
  ).then((response) => response.json());
  const max = p.count;
  const urls = p.results.map((res: PokemonType) => res.url);
  const pokemons: Pokemon[] = [];
  for (const url of urls) {
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          const promise2 = response.json();
          promise2.then((json) => {
            pokemons.push(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
  return { pokemons, max };
}

export async function getDetails(pokemon: Pokemon): Promise<string> {
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
