import { getDetails, getPokemon, getPokemonPage } from './getPokemons';
import { enableFetchMocks } from 'jest-fetch-mock';
import { mockPokemon } from './mockPokemon';
enableFetchMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Get Pokemons', () => {
  test('get pokemon by search string', () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemon));

    getPokemon('pikachu');

    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });
  test('get 10 pokemons for page 2', () => {
    fetchMock.mockResponses(
      JSON.stringify({
        count: 1200,
        results: [
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
          { url: 'url' },
        ],
      }),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon),
      JSON.stringify(mockPokemon)
    );

    getPokemonPage(2, 10);

    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://pokeapi.co/api/v2/pokemon?limit=11&offset=10'
    );
  });
  test('get pokemon description', () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        flavor_text_entries: [
          {
            flavor_text:
              'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
            language: {
              name: 'en',
              url: 'https://pokeapi.co/api/v2/language/9/',
            },
            version: {
              name: 'red',
              url: 'https://pokeapi.co/api/v2/version/1/',
            },
          },
        ],
      })
    );

    getDetails(mockPokemon);

    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://pokeapi.co/api/v2/pokemon-species/25/'
    );
  });
});
