import React from 'react';
import useGameData from '../hooks/useGameData';

import SummonaryChamp from './SummonaryChamp';

import './SummonaryInfoContainer.scss';

const SummonaryInfoContainer = () => {
  const { gameData } = useGameData();

  return (
    <div className="summonary-container">
      {
      gameData.map((champData, idx) => <SummonaryChamp championId={champData.summonerName} champData={champData} order={idx} />)
    }
    </div>
  );
};

export default SummonaryInfoContainer;
