import ErrorPage from './routes/errorPage';
import PokemonDetails from './routes/PokemonDetails';
import { Root } from './routes/root';
import NotFound from './routes/components/NotFound';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'page/:pageId',
        children: [
          {
            path: 'details/:detailsId',
            element: <PokemonDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
