import React from 'react';
import GameContext from '../models/context/GameContext';

function useGameData() {
  return React.useContext(GameContext);
}

export default useGameData;
