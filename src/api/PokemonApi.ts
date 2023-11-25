import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Pokemon, PokemonDesc, PokemonType } from './types';

interface IQueryParams {
  pageNum: number;
  qty: number;
}

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
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonDetails: builder.query<string, string>({
      query: (name: string) => `/pokemon-species/${name}`,
      transformResponse: (resp: { flavor_text_entries: PokemonDesc[] }) =>
        resp.flavor_text_entries
          .filter((item: PokemonDesc) => {
            return item.language.name === 'en';
          })[0]
          .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' '),
    }),
    getPokemonsByPage: builder.query<PokemonType[], IQueryParams>({
      query: ({ pageNum, qty }) => ({
        url: '/pokemon',
        params: {
          limit: qty,
          offset: (pageNum - 1) * qty,
        },
      }),
      transformResponse: (resp: { results: PokemonType[] }) => resp.results,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonsByPageQuery,
  useGetPokemonDetailsQuery,
  util: { getRunningQueriesThunk },
} = pokemonAPI;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonDetails, getPokemonsByPage } =
  pokemonAPI.endpoints;
