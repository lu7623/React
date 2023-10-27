import React from 'react';
import './App.css';
import { Component } from 'react';

import { Pokemon } from '../api/types';
import Loading from './Loading';
import { getPokemon, getPokemons } from '../api/getPokemons';
import PokemonsList from './PokemonsList';

interface AppProps {}
interface AppState {
  pokemon: Pokemon[];
  search: string;
  error?: Error;
  isLoading: boolean;
}
export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      pokemon: [],
      search: '',
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.error = this.error.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(searchStr: string) {
    this.setState({ isLoading: true });
    if (searchStr === '') {
      const p = await getPokemons();
      this.setState({ pokemon: p });
    } else {
      const p = await getPokemon(searchStr);
      this.setState({ pokemon: [p] });
    }

    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    const searchText = localStorage.getItem('search');
    if (searchText) {
      this.setState({ search: searchText });
      await this.fetchData(searchText);
    } else {
      await this.fetchData('');
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStr = this.state.search.toLowerCase().trim();
    await this.fetchData(searchStr);
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value;
    this.setState({ search: searchText });
    if (searchText) localStorage.setItem('search', event.target.value);
  }
  error() {
    this.setState({ error: new Error('Some error') });
  }
  render() {
    if (this.state.error) throw this.state.error;
    return (
      <>
        <div className="App">
          <h1>Pokemon</h1>
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
          {this.state.isLoading ? (
            <Loading />
          ) : this.state.pokemon ? (
            <PokemonsList pokemons={this.state.pokemon} />
          ) : null}
        </div>
        <button onClick={this.error}>Error</button>
      </>
    );
  }
}
