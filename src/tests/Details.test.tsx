import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonsList from '../components/PokemonsList';
import Details from '../components/Details';
import { mockPokemon } from '../api/mockPokemon';

describe('Pokemon details ', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<Details pokemon={mockPokemon} callback={() => {}} />);

    await waitFor(() => {
      const name = screen.getByText('PIKACHU');
      const weight = screen.getByText('Weight: 1 kg');
      const description = screen.getByText(
        'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
      );
      const stats = screen.getByText('Stats:');

      expect(name).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(stats).toBeInTheDocument();
    });
  });
  it('Ensure that clicking the close button hides the component.', async () => {
    render(<PokemonsList pokemons={[mockPokemon]} />);

    const pokemon = screen.getByTestId('card');
    fireEvent.click(pokemon);

    await waitFor(() => {
      const btn = screen.getByTestId('close');
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
    });

    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });
});
