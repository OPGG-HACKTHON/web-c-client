import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';

import ChampionContainer from './components/ChampionContainer';

const InGame = ({ match } : RouteComponentProps) => {
  const { gameId, teamId } = match.params;

  const getGameInfo = useCallback(async () => {
    if (!gameId || !teamId) {
      message.error('게임 아이디가 없습니다.');
      // TODO: redirect
      return;
    }

    console.log(gameId);
  }, [gameId, teamId]);

  useEffect(() => {
    getGameInfo();
  }, [gameId, teamId]);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((championId) => (
        <ChampionContainer championId={championId} />
      ))}
    </div>
  );
};

export default InGame;
