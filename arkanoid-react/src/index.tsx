import React from 'react';
import ReactDOM from 'react-dom';
import { GameProvider } from './context/GameContext';
import App from './App';
import './App.css';


ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById('root')
);