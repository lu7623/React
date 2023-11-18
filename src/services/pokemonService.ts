import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Pokemon } from '../api/types';

interface IQueryParams {
  pageNum: number;
  qty: number;
}

export const pokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `/pokemon/${name}`,
    }),
    getPokemonsByPage: builder.query<Pokemon[], IQueryParams>({
      query: ({ pageNum, qty }) => ({
        url: '/pokemon',
        params: {
          limit: qty,
          offset: (pageNum - 1) * qty,
        },
      }),
    }),
  }),
});
