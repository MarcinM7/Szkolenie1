import React, { useEffect, useCallback } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCanvas from '../components/GameCanvas';
import GameUI from '../components/GameUI';

const GamePage = () => {
  const { state, dispatch } = useGameContext();

  const handleKeyDown = useCallback((e) => {
    if (!state.gameStarted) {
      dispatch({ type: 'START_GAME' });
      return;
    }
    
    const { paddle } = state;
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      const newX = Math.min(paddle.x + paddle.speed, state.canvasWidth - paddle.width);
      dispatch({ type: 'MOVE_PADDLE', payload: newX });
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      const newX = Math.max(paddle.x - paddle.speed, 0);
      dispatch({ type: 'MOVE_PADDLE', payload: newX });
    }
  }, [state, dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="game-container">
      <GameCanvas />
      <GameUI />
    </div>
  );
};

export default GamePage;