import React from 'react';
import GameContext from '../models/context/GameContext';
import { ContextType } from '../models/type';

function useGameData():ContextType {
  return React.useContext(GameContext);
}

export default useGameData;
