import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Arkanoid Game</h1>
      <p>Classic arcade game implemented with React and Canvas</p>
      <Link to="/game" className="start-button">
        Start Game
      </Link>
    </div>
  );
};

export default HomePage;