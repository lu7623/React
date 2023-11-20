import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import './styles.css';
import type { AppProps } from 'next/app';
import Layout from './components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
