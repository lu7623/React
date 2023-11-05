import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/ErrorPage';
import { detailsLoader, PokemonPage } from './routes/page';
import { pageLoader, Root } from './routes/root';
import { PokemonDetails } from './routes/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:detailsId',
        element: <PokemonDetails />,
        loader: detailsLoader,
      },
      {
        path: 'page/:pageId',
        element: <PokemonPage />,
        loader: pageLoader,
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
