import { Component } from 'react';
import { Pokemon, PokemonDesc } from '../api/types';

interface ResProps {
  pokemon: Pokemon;
}
interface ResState {
  desc: string;
}
export default class PokemonCard extends Component<ResProps, ResState> {
  constructor(props: ResProps) {
    super(props);

    this.state = {
      desc: '',
    };
  }
  getDescription() {
    fetch(this.props.pokemon.species.url)
      .then((response) => response.json())
      .then((data) => {
        const description = data.flavor_text_entries
          .filter((item: PokemonDesc) => {
            return item.language.name === 'en';
          })[0]
          .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
        this.setState({ desc: description });
      });
  }
  componentDidMount() {
    this.getDescription();
  }
  componentDidUpdate() {
    this.getDescription();
  }
  render() {
    return (
      <div className="card">
        <h2>{this.props.pokemon.name.toUpperCase()}</h2>
        <h3>
          Type:
          {this.props.pokemon.types.map((type) => (
            <span className="type" key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </h3>
        <h4 className="size">Height: {this.props.pokemon.height / 10} m</h4>
        <h4 className="size">Weight: {this.props.pokemon.weight / 10} kg</h4>
        <img
          src={this.props.pokemon.sprites.front_default}
          alt="pokemon"
          width={150}
        />
        <p>{this.state.desc}</p>
      </div>
    );
  }
}
