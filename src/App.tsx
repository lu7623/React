import React from 'react';
import './App.css';
import { Component } from 'react';
import Results from './results';
import { Pokemon } from './types';

interface AppProps {}
interface AppState {
  pokemons: Pokemon | null;
  search: string;
}
export default class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: null,
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  apiBasePath = 'https://pokeapi.co/api/v2/';

  /* componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/1')
      .then((response) => response.json())
      .then((name) => this.setState({ pokemons: name.results }));
  }*/

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const p = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
    ).then((response) => response.json());
    this.setState({ pokemons: p });
    console.log(this.state.pokemons);
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Pokemon Database</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="find"
              id="find"
              onChange={(e) => this.handleChange(e)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        {this.state.pokemons ? <Results pokemon={this.state.pokemons} /> : null}
      </>
    );
  }
}
