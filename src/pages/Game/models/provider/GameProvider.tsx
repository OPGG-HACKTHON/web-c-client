import React, { useReducer, ReactElement, useRef } from 'react';
import axios from 'axios';
import { reducer, createDispatcher, initState } from './reducer';
import GameContext from '../context/GameContext';
import gameDataManager from '../managers/gameDataManager';
import { ChampData, SpellKey } from '../type';
import exampleData from './example';

interface GameProviderProps {
  matchTeamCode : string,
  children : ReactElement
}

function GameProvider({ matchTeamCode, children } : GameProviderProps) {
  const [dataState, dispatch] = useReducer(reducer, initState);
  const dispatcher = createDispatcher(dispatch);
  const spellTimer = useRef([]);

  const getChampsInitData = async () => {
    try {
      dispatcher.loading();
      //     const champsData = await gameDataManager.getChampsInitData();
      const champsData : ChampData[] = await new Promise((res) => {
        setTimeout(() => res(exampleData), 500);
      });

      dispatcher.success(champsData);
    } catch (err) {
      dispatcher.error(err);
    }
  };

  React.useEffect(() => {
    getChampsInitData();
  }, []);

  const getData = (summonerName : string):ChampData => {
    return dataState.champsData.filter((data) => data.summonerName === summonerName)[0];
  };

  const buyItems = async (summonerName : string, items : string[]) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, items };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error();

      const purchaserData = getData(summonerName);
      gameDataManager.buyItems(purchaserData, items);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const cancleItem = async (summonerName:string, itemName:string) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, itemName };
      // const { data } = await axios.post('url', body); 서버 API 정해지면 다시

      // if (!data.success) throw new Error();

      const purchaserData = getData(summonerName);
      gameDataManager.cancleItem(purchaserData, itemName);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const countSpellTime = (summonerName: string, spellKey:SpellKey) => {
    if (spellTimer.current.includes(summonerName + spellKey)) return;
    spellTimer.current.push(summonerName + spellKey);

    const timer = setInterval(() => {
      const champData = getData(summonerName);
      const spellData = champData.spells[spellKey];
      if (spellData.time === 0) {
        clearInterval(timer);
        spellData.time = null;
        dispatcher.render();
        return;
      }
      spellData.time -= 1;
      dispatcher.render();
    }, 1000);
  };

  const onUseSpell = async (summonerName:string, spellType: SpellKey) => {
    try {
      dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error();
      // const { second } = data.data;
      const second = 200;

      const userData = getData(summonerName);
      gameDataManager.useSpell(userData, spellType, second);
      countSpellTime(summonerName, spellType);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const resetSpell = async (summonerName:string, spellType: SpellKey) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.resetSpell(userData, spellType);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const updateTimeUsed = async (summonerName:string, spellType: SpellKey, changedTime : number) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.updateSpellTime(userData, spellType, changedTime);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const updateUltLevel = async (summonerName:string, level:number) => {
    try {
      // dispatcher.loading();
      // const body = { matchTeamCode, summonerName, spellType };
      // const { data } = await axios.post('url', body);

      // if (!data.success) throw new Error(); API 정해지면 다시

      const userData = getData(summonerName);
      gameDataManager.updateUltLevel(userData, level);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const providerValue = {
    gameData: dataState.champsData,
    loadingState: { loading: dataState.loading, error: dataState.error },
    buyItems,
    cancleItem,
    onUseSpell,
    resetSpell,
    updateTimeUsed,
    updateUltLevel,
  };

  return (
    <GameContext.Provider value={providerValue}>{children}
    </GameContext.Provider>
  );
}

export default GameProvider;
