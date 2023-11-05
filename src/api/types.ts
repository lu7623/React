export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  species: PokemonSpecies;
  types: PokemonTypeItem[];
  stats: PokemonStatItem[];
}

export interface PokemonType {
  name: string;
  url: string;
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
  language: {
    name: string;
  };
}

export interface PokemonRequest {
  q: string;
  pokemons: Pokemon[];
  details?: DetailsRequest;
  max: string;
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
