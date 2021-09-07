import React from 'react';

import resizeHook from '@/common/hooks/resize';
import Breakpoints from '@/global/styles/breakPoints';

import { ChampData } from '../models/type';

import Champion from './Champion';
import ChamptionItemContainer from './ChamptionItemContainer';
import ChampionItem from './ChampionItem';

import './ChampionContainer.scss';

interface ChampionComponentProps {
  champData: ChampData;
  onClick?: Function;
}

const ChampionContainer = ({
  champData,
  onClick = () => {},
}: ChampionComponentProps) => {
  const width = resizeHook();
  const isMobile = width < Breakpoints.md;

  return (
    <div className="ChampionContainer">
      <div className="top-container">
        <Champion
          champData={champData}
          onClick={onClick}
          isUsingName
        />
        {!isMobile && <ChamptionItemContainer champData={champData} />}
      </div>
      <div className="bottom-container">
        {isMobile && <ChamptionItemContainer champData={champData} />}
        {['R', 'D', 'F'].map((spell) => {
          return (
            <ChampionItem key={spell} champData={champData} spellType={spell} />
          );
        })}
      </div>
    </div>
  );
};

export default ChampionContainer;
