import React from 'react';
import useGameData from '../hooks/useGameData';

import GameContext from '../models/context/GameContext';
import ChampionContainer from './ChampionContainer';
import ItemSelector from './ChamptionItemContainer/components/ItemSelector';

import Speech from './SpeechRecognition';
import SpellTimeErrorMessage from './SpellTimeErrorMessage';

const ChampDataWrapper = () => {
  const { spellTimeError } = useGameData();
  // console.log(spellTimeError);

  return (
    <GameContext.Consumer>
      {({ gameData, isItemSelectorVisible, spellTimeError }) => (
        <>
          {spellTimeError.current && (
            <SpellTimeErrorMessage spellTimeError={spellTimeError} />
          )}
          {gameData.map((champData) => (
            <ChampionContainer
              key={champData.summonerName}
              champData={champData}
            />
          ))}
          {isItemSelectorVisible && <ItemSelector />}
          <Speech />
        </>
      )}
    </GameContext.Consumer>
  );
};

export default ChampDataWrapper;
