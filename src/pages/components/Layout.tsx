import { PropsWithChildren } from 'react';
import SearchForm from './SearchForm';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="App">
        <div className="header">
          <div className="Logo"></div>
          <SearchForm />
          <div className="Img"></div>
        </div>
      </div>
      {children}
      <button
        className="error"
        onClick={() => {
          throw new Error('Some generated error');
        }}
      >
        Error
      </button>
    </>
  );
}
