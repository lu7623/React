import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './routes/Main';
import Uncontrolled from './routes/Uncontrolled';
import HookForm from './routes/HookForm';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';

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

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
