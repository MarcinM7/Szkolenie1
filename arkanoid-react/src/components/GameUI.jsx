import React from 'react';
import { useGameContext } from '../context/GameContext';

const GameUI = () => {
  const { state, dispatch } = useGameContext();

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <div className="game-ui">
      {!state.gameStarted && !state.gameOver && (
        <button onClick={startGame}>Start Game</button>
      )}
      {state.gameOver && (
        <>
          <h2>Game Over! Your score: {state.score}</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default GameUI;