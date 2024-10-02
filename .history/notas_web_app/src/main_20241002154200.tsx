import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiado a ReactDOM para el nuevo root API
import App from './App';
import { NotesProvider } from './contexts/NotesContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>,
);