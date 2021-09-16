import React from 'react';
import useGameData from '../hooks/useGameData';

import GameContext from '../models/context/GameContext';
import ChampionContainer from './ChampionContainer';
import ItemSelector from './ChamptionItemContainer/components/ItemSelector';

import Speech from './SpeechRecognition';

const ChampDataWrapper = () => {
  const { spellTimeError } = useGameData();
  console.log(spellTimeError);

  return (
    <GameContext.Consumer>
      {({
        gameData,
        isItemSelectorVisible,
      }) => (
        <>
          {
              gameData.map((champData) => (
                <ChampionContainer
                  key={champData.summonerName}
                  champData={champData}
                />
              ))
            }
          {isItemSelectorVisible && (
            <ItemSelector />
          )}
          <Speech />
        </>
      )}
    </GameContext.Consumer>
  );
};

export default ChampDataWrapper;
