import { Pokemon } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function getPokemon(searchStr: string) {
  const p = await fetch(`${BASE_URL}${searchStr}`).then((response) =>
    response.json()
  );
  return p;
}

export async function getPokemons(urls: string[]) {
  const res: Pokemon[] = [];
  for (const url of urls) {
    const promise = fetch(url);
    promise
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
        throw new Error();
      });
  }
  return res;
}
