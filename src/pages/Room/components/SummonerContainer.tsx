import React from 'react';

import './SummonerContainer.scss';

interface SummonerContainerProps {
  src?: string;
  summonerName: string;
}
const SummonerContainer = ({ src, summonerName }: SummonerContainerProps) => {
  return (
    <div className="SummonerContainer">
      {src ? (
        <img className="summoner-icon" src={src} alt="소환사아이콘" />
      ) : (
        <div className="summoner-icon" />
      )}
      <span className="summoner-name">{summonerName}</span>
    </div>
  );
};

export default SummonerContainer;
