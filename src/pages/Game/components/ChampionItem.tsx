import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import RefreshIcon from '@/common/components/RefreshIcon';
import LockerIcon from '@/common/components/LockerIcon';
import SpellIconInItem from './SpellIconInItem';

import GameContext from '../models/context/GameContext';
import { ChampData } from '../models/type';

import './ChampionItem.scss';

interface ChampionItemProps {
  champData: ChampData;
  spellType: string;
}

const ChampionItem = ({ champData, spellType }: ChampionItemProps) => {
  const [status, setStatus] = useState('default');
  const curtainTimer = useRef(null);
  const { t } = useTranslation();

  const {
    onUseSpell, resetSpell, updateTimeUsed, updateUltLevel,
  } = useContext(
    GameContext,
  );

  const { src, time, level } = champData.spells[spellType];
  const { summonerName } = champData;

  useEffect(() => {
    if (!time || time < 0) setStatus('default');
  }, [status]);

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

  const handleClickTime = (beforeSec: number) => () => {
    createCurtain();
    setStatus('modify');
    onUseSpell(summonerName, spellType, beforeSec);
  };

  const changeToModifyMode = (e) => {
    e.stopPropagation();
    createCurtain();
    setStatus('modify');
  };

  const handleClickTimeButton = (t: number) => () => {
    updateTimeUsed(summonerName, spellType, time + t >= 0 ? time + t : 0);
  };

  if (status === 'default') {
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
              {t('game.championItem.beforeTimeText', { second: 0 })}
            </div>
            <div className="line" />
            <div className="panel-item" onClick={handleClickTime(15)}>
              {t('game.championItem.beforeTimeText', { second: 15 })}
            </div>
            <div className="line" />
            <div className="panel-item" onClick={handleClickTime(30)}>
              {t('game.championItem.beforeTimeText', { second: 30 })}
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
            {t('game.championItem.beforeTimeText', { second: 0 })}
          </div>
          <div className="line" />
          <div
            className="panel-item panel-spell-item"
            onClick={handleClickTime(15)}
          >
            {t('game.championItem.beforeTimeText', { second: 15 })}
          </div>
          <div className="line" />
          <div
            className="panel-item panel-spell-item"
            onClick={handleClickTime(30)}
          >
            {t('game.championItem.beforeTimeText', { second: 30 })}
          </div>
        </div>
      </div>
    );
  }
  if (status === 'modify') {
    return (
      <div className="ChampionItem" onClick={changeToModifyMode}>
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
          <div className="time-button" onClick={handleClickTimeButton(10)}>
            +10s
          </div>
          <div className="line" />
          <div className="time-button" onClick={handleClickTimeButton(-10)}>
            -10s
          </div>
          <div className="line" />
          <div className="refresh-button" onClick={onResetSpellTime}>
            <RefreshIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ChampionItem" onClick={changeToModifyMode}>
      <div className="item-left">
        <SpellIconInItem
          spellType={spellType}
          handleClick={handleClickIcon}
          src={src}
          level={level}
        />
        {/* TODO: 기본 초기 시간으로 리셋 */}
        <span className="leftTime">{time || 300}s</span>
      </div>
      <div className="item-right-wait">
        <LockerIcon />
        <span>잠금해제</span>
      </div>
    </div>
  );
};

export default ChampionItem;
