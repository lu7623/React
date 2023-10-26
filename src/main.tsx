import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import ErrorBoundary from './components/Error';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
