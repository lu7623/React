import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './routes/Main';
import Uncontrolled from './routes/Uncontrolled';
import HookForm from './routes/HookForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/uncontrolled/',
    element: <Uncontrolled />,
  },
  {
    path: '/hook-form/',
    element: <HookForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
