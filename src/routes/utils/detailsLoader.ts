import { LoaderFunctionArgs } from 'react-router-dom';
import { getDetails, getPokemon } from '../../api/getPokemons';

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const det = params.detailsId;
  if (det) {
    const pokemon = await getPokemon(det);
    const desc = await getDetails(pokemon);
    const details = { pokemon, desc };
    return { details };
  } else return null;
}
