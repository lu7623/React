import { LoaderFunctionArgs } from 'react-router-dom';
import { getPokemonPage } from '../../api/getPokemons';

export async function pageLoader({ request, params }: LoaderFunctionArgs) {
  const pageNum = params.pageId;
  const url = new URL(request.url);
  const q = url.searchParams.get('qty');
  if (q) {
    const { pokemons, max } = await getPokemonPage(Number(pageNum), Number(q));
    return { pokemons, max };
  } else {
    const { pokemons, max } = await getPokemonPage(Number(pageNum), 20);
    return { pokemons, max };
  }
}
