import { Component } from 'react';
import { Pokemon } from '../api/types';
import { getPokemons } from '../api/getPokemons';
import PokemonCard from './PokemonCard';

interface ListProps {
  urls: string[];
}
interface ListState {
  pokemons: Pokemon[];
  error?: Error;
}

export default class PokemonsList extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);

    this.state = {
      pokemons: [],
    };
  }

  async componentDidMount() {
    const p = await getPokemons(this.props.urls);
    this.setState({ pokemons: p });
  }

  render() {
    return (
      <div>
        {this.state.pokemons.map((p) => (
          <PokemonCard pokemon={p} />
        ))}
      </div>
    );
  }
}
