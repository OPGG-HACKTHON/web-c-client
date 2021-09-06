import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { message } from 'antd';
import GameProvider from './models/provider/GameProvider';

import ChampionContainer from './components/ChampionContainer';
import Header from './components/Header';
import SummonaryInfoContainer from './components/SummonaryInfoContainer';

const InGame = ({ match }: RouteComponentProps) => {
  const { matchTeamCode } = match.params;

  const getGameInfo = useCallback(async () => {
    if (!matchTeamCode) {
      message.error('게임 아이디가 없습니다.');
      // TODO: redirect
      return;
    }

    console.log(matchTeamCode);
  }, [matchTeamCode]);

  useEffect(() => {
    getGameInfo();
  }, [matchTeamCode]);

  return (
    <GameProvider matchTeamCode={matchTeamCode}>
      <div>
        <Header />
        <SummonaryInfoContainer />
        {['0', '1', '2', '3', '4'].map((championId) => (
          <ChampionContainer championId={championId} />
        ))}
      </div>
    </GameProvider>
  );
};

export default InGame;
