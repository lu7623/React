import React from 'react';
import './App.css';
import { Component } from 'react';
import Results from './results';
import { Pokemon } from './types';

interface AppProps {}
interface AppState {
  pokemons: Pokemon | null;
  search: string;
  hasError: boolean;
}
export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      pokemons: null,
      search: '',
      hasError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.error = this.error.bind(this);
  }

  componentDidMount() {
    const searchText = localStorage.getItem('search');
    if (searchText) {
      this.setState({ search: searchText });
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStr = this.state.search.toLowerCase().trim();
    const p = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchStr}`
    ).then((response) => response.json());
    this.setState({ pokemons: p });
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value;
    this.setState({ search: searchText });
    localStorage.setItem('search', event.target.value);
  }
  error() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) throw new Error();
    return (
      <>
        <div className="App">
          <h1>Pokemon Database</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="find"
              id="find"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
            />
            <button type="submit">Search</button>
          </form>
          <p>
            You can type pokemon name (e.g. pikachu or bulbasaur) or number
            1-1010
          </p>
          {this.state.pokemons ? (
            <Results pokemon={this.state.pokemons} />
          ) : null}
        </div>
        <button onClick={this.error}>Error</button>
      </>
    );
  }
}
