import React, {
  useState, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import RefreshIcon from '@/common/components/RefreshIcon';
import LockerIcon from '@/common/components/LockerIcon';
import SpellIconInItem from './SpellIconInItem';

import useGameData from '../hooks/useGameData';
import { ChampData, SpellKey } from '../models/type';

import './ChampionItem.scss';

interface ChampionItemProps {
  champData: ChampData;
  spellType: SpellKey;
  handleClickUltimate: Function;
}

type ModeType = 'modify' | 'default' | 'wait';

const ChampionItem = ({
  champData,
  spellType,
  handleClickUltimate,
}: ChampionItemProps) => {
  const isSpellUsed = champData.spells[spellType] !== null;
  const initMode: ModeType = isSpellUsed ? 'wait' : 'default';
  const [status, setStatus] = useState<ModeType>(initMode);
  const timer = useRef({ curtain: null, message: null });
  const { t } = useTranslation();

  const { onUseSpell, resetSpell, updateTimeUsed } = useGameData();

  const { src, time, level } = champData.spells[spellType];
  const { summonerName } = champData;

  const handleClickIcon = () => {
    if (spellType === 'R') handleClickUltimate();
  };

  const createCurtain = () => {
    if (timer.current.curtain) {
      clearTimeout(timer.current.curtain);
    }

    timer.current.curtain = setTimeout(() => {
      setStatus('wait');
      timer.current.curtain = null;
    }, 5000);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    resetSpell(summonerName, spellType);
    setStatus('default');
  };

  const changeToModifyMode = () => {
    createCurtain();
    setStatus('modify');
  };

  const handleClickTime = (beforeSec: number) => () => {
    onUseSpell(summonerName, spellType, beforeSec);
    changeToModifyMode();
  };

  const handleClickTimeButton = (sec: number) => () => {
    updateTimeUsed(summonerName, spellType, time + sec >= 0 ? time + sec : 0);
  };

  if (status === 'default' || time < 1) {
    if (spellType === 'R') {
      return (
        <div className="ChampionItem">
          <div className="panel panel-ultimate">
            <div className="panel-item no-drag" onClick={handleClickIcon}>
              <SpellIconInItem
                spellType={spellType}
                src={src}
                level={level}
                time={time}
              />
            </div>
            <div className="line" />
            <div className="panel-item no-drag" onClick={handleClickTime(0)}>
              {t('game.championItem.beforeTimeText', { second: 0 })}
            </div>
            <div className="line" />
            <div className="panel-item no-drag" onClick={handleClickTime(15)}>
              {t('game.championItem.beforeTimeText', { second: 15 })}
            </div>
            <div className="line" />
            <div className="panel-item no-drag" onClick={handleClickTime(30)}>
              {t('game.championItem.beforeTimeText', { second: 30 })}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ChampionItem">
        <div className="panel-item no-drag spell" onClick={handleClickIcon}>
          <SpellIconInItem
            spellType={spellType}
            src={src}
            level={level}
            time={time}
          />
        </div>
        <div className="panel panel-spell">
          <div
            className="panel-item no-drag panel-spell-item"
            onClick={handleClickTime(0)}
          >
            {t('game.championItem.beforeTimeText', { second: 0 })}
          </div>
          <div className="line" />
          <div
            className="panel-item no-drag panel-spell-item"
            onClick={handleClickTime(15)}
          >
            {t('game.championItem.beforeTimeText', { second: 15 })}
          </div>
          <div className="line" />
          <div
            className="panel-item no-drag panel-spell-item"
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
        <div
          className={`item-left ${spellType === 'R' && 'item-left-ultimate'}`}
          onClick={handleClickIcon}
        >
          <SpellIconInItem
            spellType={spellType}
            src={src}
            level={level}
            time={time}
          />
          <div className="leftTime">{time}s</div>
        </div>
        <div className="item-right">
          <div
            className="time-button no-drag"
            onClick={handleClickTimeButton(10)}
          >
            +10s
          </div>
          <div className="line" />
          <div
            className="time-button no-drag"
            onClick={handleClickTimeButton(-10)}
          >
            -10s
          </div>
          <div className="line" />
          <div className="refresh-button no-drag" onClick={handleReset}>
            <RefreshIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ChampionItem" onClick={changeToModifyMode}>
      <div
        className={`item-left ${spellType === 'R' && 'item-left-ultimate'}`}
        onClick={handleClickIcon}
      >
        <SpellIconInItem
          spellType={spellType}
          src={src}
          level={level}
          time={time}
        />
        <div className="leftTime">{time}s</div>
      </div>
      <div className="item-right-wait">
        <LockerIcon />
        <span className="lock-span">{t('game.championItem.unlock')}</span>
      </div>
    </div>
  );
};

export default ChampionItem;
