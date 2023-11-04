import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/ErrorPage';
import { detailsLoader, PokemonPage } from './routes/page';
import { pageLoader, Root } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: pageLoader,
    children: [
      {
        path: 'page/:pageId',
        element: <PokemonPage />,
        loader: detailsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
