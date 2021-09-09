import React, { useState } from 'react';

import resizeHook from '@/common/hooks/resize';
import Breakpoints from '@/global/styles/breakPoints';

import { ChampData } from '../models/type';

import Champion from './Champion';
import ChamptionItemContainer from './ChamptionItemContainer';
import ChampionItem from './ChampionItem';

import './ChampionContainer.scss';
import UltimateLevelModal from './UltimateLevelModal';

interface ChampionComponentProps {
  champData: ChampData;
  onClick?: Function;
}

const ChampionContainer = ({
  champData,
  onClick = () => {},
}: ChampionComponentProps) => {
  const [showModal, setShowModal] = useState(false);

  const width = resizeHook();
  const isMobile = width < Breakpoints.md;

  const handleClick = () => {
    setShowModal(() => !showModal);
  };

  return (
    <>
      {showModal && (
        <UltimateLevelModal
          src={champData.spells.R.src}
          handleClick={handleClick}
          summonerName={champData.summonerName}
          showModal={showModal}
        />
      )}
      <div className="ChampionContainer">
        <div className="top-container">
          <Champion champData={champData} onClick={onClick} isUsingName />
          {!isMobile && <ChamptionItemContainer champData={champData} />}
        </div>
        <div className="bottom-container">
          {isMobile && <ChamptionItemContainer champData={champData} />}
          {['R', 'D', 'F'].map((spell) => {
            return (
              <ChampionItem
                key={spell}
                champData={champData}
                spellType={spell}
                handleClickUltimate={handleClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChampionContainer;
