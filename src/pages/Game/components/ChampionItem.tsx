import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import TimeButton from '@/common/components/TimeButton';
import RefreshIcon from '@/common/components/RefreshIcon';
import SpellIconInItem from './SpellIconInItem';

import GameContext from '../models/context/GameContext';

import './ChampionItem.scss';

const ChampionItem = ({ champData, spellType }) => {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState('default');
  const curtainTimer = useRef(null);

  const {
    onUseSpell, resetSpell, updateTimeUsed, updateUltLevel,
  } = useContext(
    GameContext,
  );
  const { src, time, level } = champData.spells[spellType];
  const { summonerName } = champData;

  const handleClickIcon = () => {
    // updateUltLevel();
  };

  const createCurtain = () => {
    if (curtainTimer.current) {
      clearTimeout(curtainTimer.current);
    }
    curtainTimer.current = setTimeout(() => {
      setStatus('wait');
      curtainTimer.current = null;
    }, 5000);
  };

  const onResetSpellTime = (e) => {
    e.stopPropagation();
    createCurtain();
    resetSpell(summonerName, spellType);
  };

  const handleClickTime = (beforeSec) => () => {
    createCurtain();
    setStatus('modify');
    onUseSpell(summonerName, spellType, beforeSec);
  };

  const changeToModityMode = (e) => {
    e.stopPropagation();
    createCurtain();
    setStatus('modify');
  };

  if (status === 'default' || !time) {
    if (spellType === 'R') {
      return (
        <div className="ChampionItem">
          <div className="panel panel-ultimate">
            <div className="panel-item">
              <SpellIconInItem
                spellType={spellType}
                handleClick={handleClickIcon}
                src={src}
                level={level}
              />
            </div>
            <div className="line" />
            <div className="panel-item" onClick={handleClickTime(0)}>
              0s전
            </div>
            <div className="line" />
            <div className="panel-item" onClick={handleClickTime(15)}>
              15s전
            </div>
            <div className="line" />
            <div className="panel-item" onClick={handleClickTime(30)}>
              30s전
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ChampionItem">
        <div className="panel-item spell">
          <SpellIconInItem
            spellType={spellType}
            handleClick={handleClickIcon}
            src={src}
            level={level}
          />
        </div>
        <div className="panel panel-spell">
          <div
            className="panel-item panel-spell-item"
            onClick={handleClickTime(0)}
          >
            0s전
          </div>
          <div className="line" />
          <div
            className="panel-item panel-spell-item"
            onClick={handleClickTime(15)}
          >
            15s전
          </div>
          <div className="line" />
          <div
            className="panel-item panel-spell-item"
            onClick={handleClickTime(30)}
          >
            30s전
          </div>
        </div>
      </div>
    );
  }
  if (status === 'modify') {
    return (
      <div className="ChampionItem panel panel-clicked" onClick={changeToModityMode}>
        <div className="item-left">
          <SpellIconInItem
            spellType={spellType}
            handleClick={handleClickIcon}
            src={src}
            level={level}
          />

          <span className="leftTime">{time}s</span>
        </div>
        <div className="item-right">
          <div className="timeButtons">
            <TimeButton
              time="+10"
              leftTime={time}
              summonerName={summonerName}
              spellType={spellType}
              updateTimeUsed={updateTimeUsed}
            />
            <TimeButton
              time="-10"
              leftTime={time}
              summonerName={summonerName}
              spellType={spellType}
              updateTimeUsed={updateTimeUsed}
            />
          </div>
        </div>
        <RefreshIcon onResetSpellTime={onResetSpellTime} />
      </div>
    );
  }

  return (
    <div className="ChampionItem panel panel-wait" onClick={changeToModityMode}>
      <div className="item-left">
        <SpellIconInItem
          spellType={spellType}
          handleClick={handleClickIcon}
          src={src}
          level={level}
        />
        <span className="leftTime">{time || 300}s</span>
      </div>
      <div className="item-right">
        <span className="modify-button">눌러서 수정하기</span>
      </div>
    </div>
  );
};

export default ChampionItem;
