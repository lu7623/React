import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import PokemonsList from '../components/PokemonsList';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

import { mockPokemon } from '../api/mockPokemon';

describe('Pokemons list ', () => {
  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(<PokemonsList pokemons={[]} />);
    await waitFor(() => {
      const text = screen.getByText('No results found');

      expect(text).toBeInTheDocument();
    });
  });
  it('Verify that the component renders the specified number of cards', async () => {
    render(<PokemonsList pokemons={[mockPokemon, mockPokemon, mockPokemon]} />);

    await waitFor(() => {
      const pokemonImages = screen.getAllByAltText('pokemon');

      expect(pokemonImages.length).toBe(3);
    });
  });
});
