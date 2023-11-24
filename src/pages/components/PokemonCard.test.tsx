import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonsList from './PokemonsList';
import PokemonCard from './PokemonCard';
import { mockPokemon } from '../../api/mockPokemon';

describe('Pokemon card view', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    render(<PokemonCard pokemon={mockPokemon} callback={() => {}} />);

    await waitFor(() => {
      const name = screen.getByText('PIKACHU');
      const weight = screen.getByText('Weight: 1 kg');
      const description = screen.getByText(
        'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
      );
      const type = screen.getByText('electric');

      expect(name).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(type).toBeInTheDocument();
    });
  });
  it('Ensure that clicking the card opens details.', async () => {
    render(<PokemonsList pokemons={[mockPokemon]} />);

    const pokemon = screen.getByTestId('card');
    fireEvent.click(pokemon);

    await waitFor(() => {
      const details = screen.getByTestId('details');
      expect(details).toBeInTheDocument();
    });
  });
});
