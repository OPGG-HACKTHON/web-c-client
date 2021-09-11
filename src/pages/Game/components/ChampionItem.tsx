import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  MouseEventHandler,
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
  handleClickUltimate: Function;
}

const ChampionItem = ({
  champData,
  spellType,
  handleClickUltimate,
}: ChampionItemProps) => {
  const isSpellUsed = champData.spells[spellType] !== null;
  const initMode = isSpellUsed ? 'modify' : 'default';
  const [status, setStatus] = useState(initMode);
  const curtainTimer = useRef(null);
  const { t } = useTranslation();

  const {
    isNotClickedInFiveSec,
    onUseSpell,
    resetSpell,
    updateTimeUsed,
  } = useContext(GameContext);

  const { src, time, level } = champData.spells[spellType];
  const { summonerName } = champData;

  const handleClickIcon = () => {
    spellType === 'R' && handleClickUltimate();
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

  const handleReset = (e) => {
    e.stopPropagation();
    createCurtain();
    resetSpell(summonerName, spellType);
    setStatus('default');
  };

  const handleClickTime = (beforeSec: number) => (e) => {
    onUseSpell(summonerName, spellType, beforeSec);
    changeToModifyMode(e);
  };

  const changeToModifyMode = (e) => {
    e.stopPropagation();
    createCurtain();
    setStatus('modify');
  };

  const handleClickTimeButton = (t: number) => () => {
    updateTimeUsed(summonerName, spellType, time + t >= 0 ? time + t : 0);
  };

  useEffect(() => {
    if (isNotClickedInFiveSec && status !== 'default') setStatus('wait');
  }, [status]);

  if (status === 'default' || time < 1) {
    if (spellType === 'R') {
      return (
        <div className="ChampionItem">
          <div className="panel panel-ultimate">
            <div className="panel-item" onClick={handleClickIcon}>
              <SpellIconInItem
                spellType={spellType}
                src={src}
                level={level}
                time={time}
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
        <div className="panel-item spell" onClick={handleClickIcon}>
          <SpellIconInItem
            spellType={spellType}
            src={src}
            level={level}
            time={time}
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
        <div className="item-left" onClick={handleClickIcon}>
          <SpellIconInItem
            spellType={spellType}
            src={src}
            level={level}
            time={time}
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
          <div className="refresh-button" onClick={handleReset}>
            <RefreshIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ChampionItem" onClick={changeToModifyMode}>
      <div className="item-left" onClick={handleClickIcon}>
        <SpellIconInItem
          spellType={spellType}
          src={src}
          level={level}
          time={time}
        />
        <span className="leftTime">{time}s</span>
      </div>
      <div className="item-right-wait">
        <LockerIcon />
        <span>잠금해제</span>
      </div>
    </div>
  );
};

export default ChampionItem;
