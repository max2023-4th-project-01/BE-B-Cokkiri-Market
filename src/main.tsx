import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { App } from './App.tsx';
import { designSystem } from './styles/designSystem.ts';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={designSystem}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
