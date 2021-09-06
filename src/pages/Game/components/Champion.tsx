import React from 'react';
import cs from 'classnames';

import './Champion.scss';

import { ChampData } from '../models/type';

interface ChampionComponentProps {
  champData: ChampData;
  onClick?: Function;
  isUsingName?: Boolean;
}

const Champion = ({
  champData,
  onClick,
  isUsingName = false,
}: ChampionComponentProps) => {
  const { time, isOn } = champData.spells.R;

  return (
    <div className={cs('Champion', { 'has-ultimate': isOn })} onClick={() => onClick()}>
      <div className="image-container">
        <div className="image-holder">
          <img
            className="image"
            alt="챔피언 초상화"
            src={champData.src}
          />
        </div>
        { !isOn && (<h4 className="counter">{time}</h4>) }
        <div className="ultimate-light" />
      </div>
      { isUsingName && (
        <div className="name-container">
          <h4 className="champ-name">{champData.champName}</h4>
          <span className="summoner-name">{champData.summonerName}</span>
        </div>
      )}
    </div>
  );
};

export default Champion;
