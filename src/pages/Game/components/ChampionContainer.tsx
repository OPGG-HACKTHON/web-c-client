import React, { useEffect } from 'react';

import { ChampData } from '../models/type';

import Champion from './Champion';
import ChampionItem from './ChampionItem';

import './ChampionContainer.scss';

interface ChampionComponentProps {
  champData: ChampData;
  onClick?: Function;
}

const ChampionContainer = ({
  champData,
  onClick,
}: ChampionComponentProps) => {
  useEffect(() => {
    //
  }, []);

  return (
    <div className="ChampionContainer">
      <div className="top-container">
        <Champion champData={champData} onClick={onClick} />
      </div>
      <div className="bottom-container">
        <div className="items" />
        <ChampionItem type="ultimate" />
        <ChampionItem type="spell" />
        <ChampionItem type="spell" />
      </div>
    </div>
  );
};

export default ChampionContainer;
