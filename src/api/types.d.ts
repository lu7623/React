export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  species: PokemonSpecies;
  types: PokemonTypeItem[];
  stats: PokemonStatItem[];
  description?: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface IQueryParams {
  pageNum: number;
  qty: number;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface PokemonTypeItem {
  slot: number;
  type: PokemonType;
}

export interface PokemonDesc {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface DetailsRequest {
  pokemon: Pokemon;
  desc?: string;
}

export type PageParams = {
  pokemonId: string;
};

export interface PokemonStatItem {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

export interface PokemonPages {
  pokemons: Pokemon[];
  max: string;
}

export interface PokemonResults {
  count: number;
  next: null;
  previous: null;
  results: PokemonType[];
}

export interface IDescription {
  flavor_text_entries: PokemonDesc[];
}
