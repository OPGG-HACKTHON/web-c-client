import React, { useEffect } from 'react';

import Champion from './Champion';

import './ChampionContainer.scss';

// TODO: Context 따라 수정
interface ChampionComponentProps {
  championId: number;
  onClick?: Function;
}

const ChampionContainer = ({
  onClick,
  championId,
}: ChampionComponentProps) => {
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
        <div className="spells" />
        <div className="spells" />
        <div className="spells" />
      </div>
    </div>
  );
};

export default ChampionContainer;
