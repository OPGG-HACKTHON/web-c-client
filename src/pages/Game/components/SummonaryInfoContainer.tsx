import React, { useCallback, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import useGameData from '../hooks/useGameData';

import SummonaryChamp from './SummonaryChamp';

import './SummonaryInfoContainer.scss';

const SortableItem = SortableElement(({ champData, currentIndex, swapTargetIndex }) => (
  <SummonaryChamp
    key={champData.summonerName}
    champData={champData}
    order={currentIndex}
    swapTargetIndex={swapTargetIndex}
  />
));

const SortableList = SortableContainer(({ gameData, swapTargetIndex }) => {
  return (
    <div className="summonary-info-fixed-holder">
      {gameData.map((champData, currentIndex) => (
        <SortableItem
          key={champData.summonerName}
          champData={champData}
          index={currentIndex}
          currentIndex={currentIndex}
          swapTargetIndex={swapTargetIndex}
        />
      ))}
    </div>
  );
});

const swapArrayLocs = function (arr, index1, index2) {
  // 일부러 얕은 복사 진행함
  const newArr = [...arr];
  const temp = arr[index1];

  newArr[index1] = newArr[index2];
  newArr[index2] = temp;

  return newArr;
};

const SummonaryInfoContainer = () => {
  const [swapTargetIndex, setSwapTargetIndex] = useState();
  const { gameData, updateGameData } = useGameData();

  const findChampElemsPos = useCallback(() => {
    const topbarElem = document.querySelector('#Topbar') as HTMLElement;
    const summonaryInfoContainerElem = document.querySelector('#SummonaryInfoContainer') as HTMLElement;
    const dragonElem = document.querySelector('#dragonContainer') as HTMLElement;
    const defaultHeight = topbarElem.offsetHeight + summonaryInfoContainerElem.offsetHeight + dragonElem.offsetHeight;
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

  const onSortOver = useCallback(({ newIndex }) => {
    setSwapTargetIndex(newIndex);
  }, [gameData]);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    updateGameData(swapArrayLocs(gameData, oldIndex, newIndex));
    scrollToChampion(newIndex);
    setSwapTargetIndex(null);
  }, [gameData]);

  return (
    <div
      id="SummonaryInfoContainer"
      className="SummonaryInfoContainer"
    >
      <SortableList
        gameData={gameData}
        swapTargetIndex={swapTargetIndex}

        onSortStart={onSortStart}
        onSortOver={onSortOver}
        onSortEnd={onSortEnd}
        helperClass="react-sortable-hoc-current"
        axis="x"
        lockOffset="0%"
      />
    </div>
  );
};

export default SummonaryInfoContainer;
