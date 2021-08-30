import React, { useState, useEffect } from 'react';
import TimeButton from '@/common/components/TimeButton';
import RefreshIcon from '@/common/components/RefreshIcon';
import './ChampionItem.scss';

interface ChampionItemProps {
  type: string;
  handleClick?: Function;
}

const ChampionItem = ({ type, handleClick }: ChampionItemProps) => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('default');

  const handleClickIcon = () => {
    handleClick();
  };

  useEffect(() => {
    if (counter < 5) {
      const timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setStatus('wait');
  }, [counter]);

  const resetCounter = () => {
    setCounter(0);
  };

  const handleClickTime = () => {
    resetCounter();
    setStatus('modify');
  };

  if (status === 'default') {
    return (
      <div className="ChampionItem">
        <div
          className={
            type === 'spell' ? 'panel-item icon' : 'panel-item icon ultimate'
          }
          onClick={handleClickIcon}
        >
          {/* TODO: 레벨 받아오기 */}
          {type === 'ultimate' && <div className="ultimate-level">Lv.1</div>}
          {/* TODO: 아이템 사진 받아오기 */}
          <img src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/SummonerFlash.png" />
        </div>
        <div className="line" />
        <div className="panel-item" onClick={handleClickTime}>
          0s전
        </div>
        <div className="line" />
        <div className="panel-item" onClick={handleClickTime}>
          15s전
        </div>
        <div className="line" />
        <div className="panel-item" onClick={handleClickTime}>
          30s전
        </div>
      </div>
    );
  } if (status === 'modify') {
    return (
      <div className="ChampionItem panel-clicked">
        <div className="item-left">
          <div className="icon" onClick={handleClickIcon}>
            {/* TODO: 사진 받아오기 */}
            <img src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/SummonerFlash.png" />
          </div>
          <span className="leftTime">300s</span>
        </div>
        <div className="item-right">
          <div className="timeButtons">
            <TimeButton time="+10" handleClick={handleClickTime} />
            <TimeButton time="-10" handleClick={handleClickTime} />
          </div>
        </div>
        <RefreshIcon />
      </div>
    );
  }
  return (
    <div className="ChampionItem panel-wait" onClick={handleClickTime}>
      <div className="item-left">
        <div className="icon" onClick={handleClickIcon}>
          {/* TODO: 사진 받아오기 */}
          <img src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/SummonerFlash.png" />
        </div>
        <span className="leftTime">300s</span>
      </div>
      <div className="item-right">
        <span className="modify-button">눌러서 수정하기</span>
      </div>
    </div>
  );
};

export default ChampionItem;
