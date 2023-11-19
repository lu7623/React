import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Pokemon, PokemonDesc, PokemonType } from '../api/types';

interface IQueryParams {
  pageNum: number;
  qty: number;
}

export const pokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonDetails: builder.query<string, string>({
      query: (name: string) => `/pokemon-species/${name}`,
      transformResponse: (resp: { flavor_text_entries: PokemonDesc[] }) =>
        resp.flavor_text_entries
          .filter((item: PokemonDesc) => {
            return item.language.name === 'en';
          })[0]
          .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' '),
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `/pokemon/${name}`,
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
