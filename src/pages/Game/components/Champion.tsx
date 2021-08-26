import React, { useState, useEffect } from 'react';
import cs from 'classnames';

import './Champion.scss';

import useInterval from '@/common/hooks/useInterval';

// TODO: Context 따라 수정
interface ChampionComponentProps {
  championId: number;
  onClick?: Function;
}

const Champion = ({
  onClick,
  championId,
}: ChampionComponentProps) => {
  // TODO: Context 개발 후 Context 로 대체
  const [count, setCount] = useState(3);

  const hasUltimate = count < 1;

  useEffect(() => {
    // TODO: champion image 정해지면 수정
    console.log('championId', championId);
  }, []);

  useInterval(() => {
    setCount(count - 1);
  }, count > 0 && 1000);

  return (
    <div className={cs('Champion', { 'has-ultimate': hasUltimate })} onClick={() => onClick()}>
      <img
        className="image"
        alt="챔피언 초상화"
        src="https://opgg-static.akamaized.net/images/lol/champion/Ahri.png"
      />
      { !hasUltimate && (<h4 className="counter">{count}</h4>) }
      <div className="ultimate-light" />
    </div>
  );
};

export default Champion;
