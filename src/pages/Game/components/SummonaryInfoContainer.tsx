import React, { useCallback } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

import useGameData from '../hooks/useGameData';

import SummonaryChamp from './SummonaryChamp';

import './SummonaryInfoContainer.scss';

const SortableItem = SortableElement(({ champData, index }) => (
  <SummonaryChamp
    key={champData.summonerName}
    champData={champData}
  />
));

const SortableList = SortableContainer(({ gameData }) => {
  return (
    <div className="summonary-info-fixed-holder">
      {gameData.map((champData, index) => (
        <SortableItem key={`item-${champData.summonerName}`} champData={champData} index={index} />
      ))}
    </div>
  );
});

const SummonaryInfoContainer = () => {
  const { gameData, updateGameData } = useGameData();

  const findChampElemsPos = useCallback(() => {
    const topbarElem = document.querySelector('#Topbar') as HTMLElement;
    const summonaryInfoContainerElem = document.querySelector('#SummonaryInfoContainer') as HTMLElement;
    const defaultHeight = topbarElem.offsetHeight + summonaryInfoContainerElem.offsetHeight;
    const champElems = document.querySelectorAll('.ChampionContainer');
    const champsScrollPos = Array.from(champElems).map((elem: HTMLElement) => elem.offsetTop - defaultHeight);
    return champsScrollPos;
  }, [gameData]);

  const scrollToChampion = useCallback((order) => {
    const champsScrollPos = findChampElemsPos();
    window.scrollTo({ top: champsScrollPos[order] });
  }, [gameData]);

  const onSortStart = useCallback(({ index }) => {
    scrollToChampion(index);
  }, [gameData]);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    updateGameData(arrayMoveImmutable(gameData, oldIndex, newIndex));
    scrollToChampion(newIndex);
  }, [gameData]);

  return (
    <div
      id="SummonaryInfoContainer"
      className="SummonaryInfoContainer"
    >
      <SortableList
        gameData={gameData}
        onSortStart={onSortStart}
        onSortEnd={onSortEnd}
        helperClass="react-sortable-hoc-current"
        axis="x"
      />
    </div>
  );
};

export default SummonaryInfoContainer;
