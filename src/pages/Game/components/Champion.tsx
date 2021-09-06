import React from 'react';
import cs from 'classnames';

import './Champion.scss';

import { ChampData } from '../models/type';

interface ChampionComponentProps {
  champData: ChampData;
  onClick?: Function;
}

const Champion = ({
  champData,
  onClick,
}: ChampionComponentProps) => {
  const { time, isOn } = champData.spells.R;

  return (
    <div className={cs('Champion', { 'has-ultimate': isOn })} onClick={() => onClick()}>
      <img
        className="image"
        alt="챔피언 초상화"
        src="https://opgg-static.akamaized.net/images/lol/champion/Ahri.png"
      />
      { !isOn && (<h4 className="counter">{time}</h4>) }
      <div className="ultimate-light" />
    </div>
  );
};

export default Champion;
