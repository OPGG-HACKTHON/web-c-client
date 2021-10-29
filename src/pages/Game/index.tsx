import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import GameProvider from './models/provider/GameProvider';

import SummonaryInfoContainer from './components/SummonaryInfoContainer';

import DragonBar from './components/DragonBar';
import ChampDataWrapper from './components/ChampDataWrapper';

const Game = ({ match }: RouteComponentProps) => {
  const { matchTeamCode } = match.params;

  return (
    <GameProvider matchTeamCode={matchTeamCode}>
      <div className="Game" style={{ position: 'relative' }}>
        <SummonaryInfoContainer />
        <DragonBar />
        <ChampDataWrapper />
      </div>
    </GameProvider>
  );
};

export default Game;
