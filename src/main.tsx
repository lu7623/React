import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/ErrorPage';
import { PokemonDetails } from './routes/PokemonDetails';
import { detailsLoader } from './routes/utils/detailsLoader';
import { Root } from './routes/Root';

const router = createBrowserRouter([
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
            loader: detailsLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
