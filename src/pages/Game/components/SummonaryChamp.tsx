import React from 'react';
import { ChampData, SpellData } from '../models/type';
import Champion from './Champion';

import './SummonaryChamp.scss';

interface SummonaryChampProps {
  championId: string
  champData: ChampData
  order: number
}

const SummonaryChamp = ({ championId, champData, order }:SummonaryChampProps) => {
  const findChampElemsPos = () => {
    const topElem = document.querySelector('.Top-Container') as HTMLElement;
    const defaultHeight = topElem.offsetHeight;
    const champElems = document.querySelectorAll('.ChampionContainer');
    const champsScrollPos = Array.from(champElems).map((elem : HTMLElement) => elem.offsetTop - defaultHeight);
    return champsScrollPos;
  };

  const onClickChampion = () => {
    const champsScrollPos = findChampElemsPos();
    window.scrollTo({ top: champsScrollPos[order], behavior: 'smooth' });
  };

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
