import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import GameContext from './models/context/GameContext';
import GameProvider from './models/provider/GameProvider';

import SummonaryInfoContainer from './components/SummonaryInfoContainer';
import ChampionContainer from './components/ChampionContainer';
import ItemSelector from './components/ChamptionItemContainer/components/ItemSelector';

import Speech from './components/SpeechRecognition';
import DragonBar from './components/DragonBar';

const InGame = ({ match }: RouteComponentProps) => {
  const { matchTeamCode } = match.params;

  return (
    <GameProvider matchTeamCode={matchTeamCode}>
      <div>
        <SummonaryInfoContainer />
        <DragonBar />
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
      </div>
    </GameProvider>
  );
};

export default InGame;
