import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  IDescription,
  IQueryParams,
  Pokemon,
  PokemonDesc,
  PokemonResults,
} from './types';

export const pokemonAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const pokemonResult = await fetchWithBQ(`pokemon/${_arg}`);
        if (pokemonResult.error)
          return { error: pokemonResult.error as FetchBaseQueryError };
        const pokemon = pokemonResult.data as Pokemon;
        const desc = await fetchWithBQ(pokemon.species.url);
        if (desc.error) return { error: desc.error as FetchBaseQueryError };
        const descriptions = desc.data as IDescription;
        const singleDesc = descriptions.flavor_text_entries
          .filter((item: PokemonDesc) => {
            return item.language.name === 'en';
          })[0]
          .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
        const result = Object.assign(
          {},
          {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            sprites: pokemon.sprites,
            species: pokemon.species,
            types: pokemon.types,
            stats: pokemon.stats,
            description: singleDesc,
          }
        );

        return result
          ? { data: result as Pokemon }
          : { error: result as FetchBaseQueryError };
      },
    }),
    getPokemonsByPage: builder.query<Pokemon[], IQueryParams>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const pokemonResult = await fetchWithBQ(
          `pokemon?limit=${_arg.qty}&offset=${(_arg.pageNum - 1) * _arg.qty}`
        );
        if (pokemonResult.error)
          return { error: pokemonResult.error as FetchBaseQueryError };
        const res = pokemonResult.data as PokemonResults;
        const result: Pokemon[] = [];
        for (const r of res.results) {
          const singlepokemon = await fetchWithBQ(r.url);
          if (singlepokemon.error)
            return { error: singlepokemon.error as FetchBaseQueryError };
          const pokemon = singlepokemon.data as Pokemon;
          const desc = await fetchWithBQ(pokemon.species.url);
          if (desc.error) return { error: desc.error as FetchBaseQueryError };
          const descriptions = desc.data as IDescription;
          const singleDesc = descriptions.flavor_text_entries
            .filter((item: PokemonDesc) => {
              return item.language.name === 'en';
            })[0]
            .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
          const newPokemon = Object.assign(
            {},
            {
              id: pokemon.id,
              name: pokemon.name,
              height: pokemon.height,
              weight: pokemon.weight,
              sprites: pokemon.sprites,
              species: pokemon.species,
              types: pokemon.types,
              stats: pokemon.stats,
              description: singleDesc,
            }
          );
          result.push(newPokemon);
        }
        return result
          ? { data: result as Pokemon[] }
          : { error: result as FetchBaseQueryError };
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonsByPageQuery,
  util: { getRunningQueriesThunk },
} = pokemonAPI;

export const { getPokemonByName, getPokemonsByPage } = pokemonAPI.endpoints;
