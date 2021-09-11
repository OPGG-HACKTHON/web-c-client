import React from 'react';
import cs from 'classnames';

import { ChampData, SpellData } from '../models/type';
import Champion from './Champion';

import './SummonaryChamp.scss';

interface SummonaryChampProps {
  champData: ChampData;
  order: number;
  swapTargetIndex: number;
}

const SummonaryChamp = ({
  champData,
  order,
  swapTargetIndex,
}: SummonaryChampProps) => {
  const { spells } = champData;

  return (
    <div
      className={cs('SummonaryChamp', { swapping: order === swapTargetIndex })}
    >
      <div className="summonary-top-container">
        <Champion champData={champData} />
      </div>
      <div className="summonary-bottom-container">
        {['D', 'F'].map((spellKey) => {
          const spellData: SpellData = spells[spellKey];
          const spellTime: number | string = spellData.time ?? '-';

          return (
            <div
              key={spellKey}
              className={cs('summonary-spell-container', {
                'spell-off': !spellData.isOn,
              })}
            >
              <img
                className={spellTime !== '-' && 'gray-filter'}
                src={spellData.src}
                alt="스펠 이미지"
              />
              <span>{spellTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummonaryChamp;
