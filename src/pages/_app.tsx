import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import './styles.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <Provider store={store}>
        <Layout>
          {loading ? <Loading /> : <Component {...props.pageProps} />}
        </Layout>
      </Provider>
    </>
  );
}
