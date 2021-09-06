import React from 'react';
import cs from 'classnames';

import { ChampData, SpellData } from '../models/type';
import Champion from './Champion';

import './SummonaryChamp.scss';

interface SummonaryChampProps {
  champData: ChampData
  order: number
}

const SummonaryChamp = ({ champData, order }:SummonaryChampProps) => {
  const findChampElemsPos = () => {
    const topbarElem = document.querySelector('#Topbar') as HTMLElement;
    const summonaryInfoContainerElem = document.querySelector('#SummonaryInfoContainer') as HTMLElement;
    const defaultHeight = topbarElem.offsetHeight + summonaryInfoContainerElem.offsetHeight;
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
    <div className="SummonaryChamp">
      <div className="summonary-top-container">
        <Champion onClick={onClickChampion} champData={champData} />
      </div>
      <div className="summonary-bottom-container">
        {
            ['D', 'F'].map((spellKey) => {
              const spellData : SpellData = spells[spellKey];
              const spellTime: number | string = spellData.time ?? '-';

              return (
                <div
                  key={spellKey}
                  className={cs('summonary-spell-container', { 'spell-off': !spellData.isOn })}
                >
                  <img src={spellData.src} alt="스펠 이미지" />
                  <span>{spellTime}</span>
                </div>
              );
            })
        }
      </div>
    </div>
  );
};

export default SummonaryChamp;
