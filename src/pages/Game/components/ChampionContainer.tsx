import React, { useCallback, useState } from 'react';

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
  const [
    isUltimateLevelModalVisible, setIsUltimateLevelModalVisible,
  ] = useState(false);

  const isMobile = true;
  // TODO-web
  // const width = resizeHook();
  // const isMobile = width < Breakpoints.md;

  const toggleModal = useCallback(() => {
    setIsUltimateLevelModalVisible(() => !isUltimateLevelModalVisible);
  }, [isUltimateLevelModalVisible]);

  return (
    <>
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
                handleClickUltimate={toggleModal}
              />
            );
          })}
        </div>
      </div>
      <UltimateLevelModal
        currentLevel={champData.spells.R.level}
        isVisible={isUltimateLevelModalVisible}
        toggleModal={toggleModal}
        src={champData.spells.R.src}
        summonerName={champData.summonerName}
      />
    </>
  );
};

export default ChampionContainer;
