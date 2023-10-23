import React, { Component } from 'react';
import { Pokemon } from './types';

export default class Results extends Component<{ pokemon: Pokemon }> {
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
      </div>
    );
  }
}
