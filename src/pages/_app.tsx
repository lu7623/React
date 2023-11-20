import { Provider } from 'react-redux';
import SearchForm from '../components/SearchForm';
import { wrapper } from '../store/store';
import './styles.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <div className="header">
            <div className="Logo"></div>
            <SearchForm />
            <div className="Img"></div>
          </div>
        </div>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
