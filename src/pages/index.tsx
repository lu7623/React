import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { wrapper } from '../store/store';
import { getPokemonsByPage, getRunningQueriesThunk } from '../api/PokemonApi';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/page/1?qty=20');
  }, []);

  return <div></div>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getPokemonsByPage.initiate({ pageNum: 1, qty: 20 }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
