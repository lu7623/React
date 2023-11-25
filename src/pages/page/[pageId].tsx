import {
  getPokemonsByPage,
  getRunningQueriesThunk,
  useGetPokemonsByPageQuery,
} from '../../api/PokemonApi';

import { wrapper } from '../../store/store';
import { useRouter } from 'next/dist/client/router';
import PokemonPage from '../../components/PokemonPage';
import { IQueryParams } from '../../api/types';
import Loading from '../../components/Loading';
import { useAppSelector } from '../../hooks/custom';

export default function Pokemons() {
  const router = useRouter();
  const { qty } = useAppSelector((state) => state.perPageReducer);
  const listId = parseInt(router.query.pageId as string);
  const params: IQueryParams = { pageNum: listId, qty: Number(qty) };
  const result = useGetPokemonsByPageQuery(params);
  const { data: pokemonsResult, isLoading } = result;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PokemonPage pokemons={pokemonsResult ? pokemonsResult : []} />
      )}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const listId = parseInt(context.params?.pageId as string) || 1;
    const qty = parseInt(context.params?.qty as string) || 20;
    if (typeof listId === 'number' && typeof qty === 'number') {
      store.dispatch(getPokemonsByPage.initiate({ pageNum: listId, qty: qty }));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
