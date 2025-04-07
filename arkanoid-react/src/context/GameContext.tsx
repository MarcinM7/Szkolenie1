import React, { createContext, useReducer } from 'react';
import { gameReducer, initialState } from '../reducer/gameReducer';
import { GameState, GameAction } from '../types/gameTypes';

export const GameContext = createContext(0);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return React.useContext(GameContext);
};