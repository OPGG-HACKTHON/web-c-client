import React, { useEffect } from 'react';

import Champion from './Champion';
import ChampionItem from './ChampionItem';
import useGameData from '../hooks/useGameData';

import './ChampionContainer.scss';

// TODO: Context 따라 수정
interface ChampionComponentProps {
  championId: string;
  onClick?: Function;
}

const ChampionContainer = ({ onClick, championId }: ChampionComponentProps) => {
  const { gameData } = useGameData();

  useEffect(() => {
    //
  }, []);

  return (
    <div className="ChampionContainer">
      <div className="top-container">
        <Champion onClick={onClick} championId={championId} />
      </div>
      <div className="bottom-container">
        <div className="items" />
        {['R', 'D', 'F'].map((spell) => {
          return (
            <ChampionItem
              key={spell}
              spellData={gameData[championId].spells[spell]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChampionContainer;
