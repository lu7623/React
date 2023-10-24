import React, { Component } from 'react';
import { Pokemon } from './types';

interface ResProps {
  pokemon: Pokemon;
}
interface ResState {
  desc: string;
}
export default class Results extends Component<ResProps, ResState> {
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
          .filter((item) => {
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
      <div>
        <h1>{this.props.pokemon.name}</h1>
        <h3>
          Type:{' '}
          {this.props.pokemon.types.map((type) => (
            <span>{type.type.name} </span>
          ))}
        </h3>
        <h2>Height: {this.props.pokemon.height / 10} m</h2>
        <h2>Weight: {this.props.pokemon.weight / 10} kg</h2>
        <img
          src={this.props.pokemon.sprites.front_default}
          alt=""
          width={160}
        />
        <p>{this.state.desc}</p>
      </div>
    );
  }
}
