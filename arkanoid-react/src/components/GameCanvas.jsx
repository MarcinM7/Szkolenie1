import React, { useRef, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Inicjalizacja gry
    dispatch({ type: 'INIT_GAME', payload: { canvas, ctx } });
    
    // Rozpoczęcie pętli gry
    const gameLoop = setInterval(() => {
      dispatch({ type: 'UPDATE_GAME' });
    }, 1000/60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [dispatch]);

  return (
    <canvas 
      ref={canvasRef} 
      width={state.canvasWidth} 
      height={state.canvasHeight}
    />
  );
};

export default GameCanvas;