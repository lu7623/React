import './App.css';
import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { PokemonPage } from './PokemonPage';
import { useAppSelector } from '../hooks/custom';
import PokemonsList from '../components/PokemonsList';

export function Root() {
  const [isError, setIsError] = useState<Error>();
  const showError = () => {
    setIsError(new Error('Some generated error'));
  };
  const searchStr = useAppSelector((state) => state.searchReducer.searchStr);
  if (isError) throw isError;
  return (
    <>
      <div className="App">
        <div className="header">
          <div className="Logo"></div>
          <SearchForm />
          <div className="Img"></div>
        </div>

        <div>
          {searchStr === '' ? (
            <PokemonPage />
          ) : (
            <PokemonsList pokemonNames={[searchStr]} />
          )}
        </div>
      </div>
      <button className="error" onClick={showError}>
        Error
      </button>
    </>
  );
}
