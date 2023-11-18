import ErrorPage from './routes/ErrorPage000';
import PokemonDetails from './routes/PokemonDetails';
import { Root } from './routes/Root0000';
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
