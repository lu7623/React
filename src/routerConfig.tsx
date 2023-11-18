import ErrorPage from './routes/ErrorPage';
import PokemonDetails from './routes/PokemonDetails';
import { Root } from './routes/Root';
import NotFound from './routes/components/NotFound';

export const routerConfig = [
  {
    path: 'page/:pageId',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:detailsId',
        element: <PokemonDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
