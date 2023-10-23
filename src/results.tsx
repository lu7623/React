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

  componentDidMount() {
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
  componentDidUpdate() {
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
  render() {
    return (
      <div>
        <h1>{this.props.pokemon.name}</h1>
        <h2>Height:{this.props.pokemon.height}</h2>
        <h2>Weight:{this.props.pokemon.weight}</h2>
        <img
          src={this.props.pokemon.sprites.front_default}
          alt=""
          width={140}
        />
        <p>{this.state.desc}</p>
      </div>
    );
  }
}
