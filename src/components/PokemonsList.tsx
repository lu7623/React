import { Component } from 'react';
import { Pokemon } from '../api/types';
import PokemonCard from './PokemonCard';

interface ListProps {
  pokemons: Pokemon[];
}
interface ListState {
  error?: Error;
}

export default class PokemonsList extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
  }

  render() {
    return (
      <div className="cardContainer">
        {this.props.pokemons.map((p) => (
          <PokemonCard pokemon={p} />
        ))}
      </div>
    );
  }
}
