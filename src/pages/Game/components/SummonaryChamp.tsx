import React from 'react';
import { ChampData, SpellData } from '../models/type';
import Champion from './Champion';

import './SummonaryChamp.scss';

interface SummonaryChampProps {
  championId: string
  champData: ChampData
}

const SummonaryChamp = ({ championId, champData }:SummonaryChampProps) => {
  const onClickChampion = () => {};

  const { spells } = champData;
  return (
    <div className="summonary-info">
      <div className="summonary-top-container">
        <Champion onClick={onClickChampion} championId={championId} />
      </div>
      <div className="summonary-bottom-container">
        {
            ['D', 'F'].map((spellKey) => {
              if (spellKey === 'R') return null;
              const spellData : SpellData = spells[spellKey];
              const isSpellOff = spellData.time === null;
              const spellTime: number | string = spellData.time ?? '-';

              return (
                <div className={`summonary-spell-container ${isSpellOff ? 'spell-off' : null}`}>
                  <img src={spellData.src} alt="스펠 이미지" />
                  <span>{ spellTime}</span>
                </div>
              );
            })
        }
      </div>
    </div>
  );
};

export default SummonaryChamp;
