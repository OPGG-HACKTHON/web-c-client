import React from 'react';
import useGameData from '../hooks/useGameData';

import SummonaryChamp from './SummonaryChamp';

import './SummonaryInfoContainer.scss';

const SummonaryInfoContainer = () => {
  const { gameData } = useGameData();

  return (
    <div
      id="SummonaryInfoContainer"
      className="SummonaryInfoContainer"
    >
      <div className="summonary-info-fixed-holder">
        {
          gameData.map((champData, idx) => (
            <SummonaryChamp
              key={champData.summonerName}
              champData={champData}
              order={idx}
            />
          ))
        }
      </div>
    </div>
  );
};

export default SummonaryInfoContainer;
