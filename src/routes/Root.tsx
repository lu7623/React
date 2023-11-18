import './App.css';
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import { PokemonPage } from './PokemonPage';

export function Root() {
  const [isError, setIsError] = useState<Error>();

  const showError = () => {
    setIsError(new Error('Some generated error'));
  };

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
          <PokemonPage />
        </div>
      </div>
      <button className="error" onClick={showError}>
        Error
      </button>
    </>
  );
}
