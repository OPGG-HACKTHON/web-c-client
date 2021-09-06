import React from "react";
import { RouteComponentProps } from "react-router-dom";

import GameContext from "./models/context/GameContext";
import GameProvider from "./models/provider/GameProvider";

import SummonaryInfoContainer from "./components/SummonaryInfoContainer";
import ChampionContainer from "./components/ChampionContainer";

const InGame = ({ match }: RouteComponentProps) => {
  const { matchTeamCode } = match.params;

  return (
    <GameProvider matchTeamCode={matchTeamCode}>
      <div>
        <SummonaryInfoContainer />
        <GameContext.Consumer>
          {({ gameData }) =>
            gameData.map((champData) => (
              <ChampionContainer
                key={champData.summonerName}
                champData={champData}
              />
            ))
          }
        </GameContext.Consumer>
      </div>
    </GameProvider>
  );
};

export default InGame;
