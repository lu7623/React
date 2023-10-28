import React from 'react';
import './App.css';
import { Component } from 'react';
import { Pokemon } from '../api/types';
import Loading from './Loading';
import { getPokemon, getPokemons } from '../api/getPokemons';
import PokemonsList from './PokemonsList';
import SearchForm from './SearchForm';

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
    try {
      if (searchStr === '') {
        const p = await getPokemons();
        this.setState({ pokemon: p });
      } else {
        const p = await getPokemon(searchStr);
        this.setState({ pokemon: [p] });
      }
    } catch {
      this.setState({ pokemon: [] });
    }
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    const searchText = localStorage.getItem('search');
    if (searchText) {
      this.setState({ search: searchText });
      this.fetchData(searchText);
    } else {
      this.fetchData('');
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStr = this.state.search.toLowerCase().trim();
    await this.fetchData(searchStr);
    localStorage.setItem('search', this.state.search);
  };

  handleChange(str: string) {
    this.setState({ search: str });
  }

  error() {
    this.setState({ error: new Error('Some generated error') });
  }

  render() {
    if (this.state.error) throw this.state.error;
    return (
      <>
        <div className="App">
          <div className="header">
            <div className="Logo"></div>
            <form onSubmit={this.handleSubmit}>
              <SearchForm
                callback={this.handleChange}
                searchText={this.state.search}
              />
              <button type="submit">Search</button>
              <p>
                You can type pokemon name (e.g. pikachu or bulbasaur) or number
                1-1010
              </p>
            </form>
            <div className="Img"></div>
          </div>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <PokemonsList pokemons={this.state.pokemon} />
          )}
        </div>
        <button className="error" onClick={this.error}>
          Error
        </button>
      </>
    );
  }
}
