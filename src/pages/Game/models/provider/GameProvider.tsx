import React, {
  useReducer,
  ReactElement,
  useRef,
  useEffect,
  useState,
} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import { string } from 'prop-types';
import { reducer, createDispatcher, initState } from './reducer';
import GameContext from '../context/GameContext';
import gameDataManager from '../managers/gameDataManager';
import {
  ChampData, SocketItemData, SocketSpellData, SpellKey,
} from '../type';

interface GameProviderProps {
  matchTeamCode: string;
  children: ReactElement;
}

function GameProvider({ matchTeamCode, children }: GameProviderProps) {
  const [dataState, dispatch] = useReducer(reducer, initState);
  const [isNotClickedInFiveSec, setIsNotClickedInFiveSec] = useState(false);
  const dispatcher = createDispatcher(dispatch);
  const spellTimer = useRef([]);
  const socket = useRef(null);
  const stomp = useRef(null);
  const curtainTimer = useRef(null);
  const [itemSelectingSummonerName, setItemSelectingSummonerName] = useState();

  const getChampsInitData = async () => {
    try {
      dispatcher.loading();
      const champsData = await gameDataManager.getChampsInitData(matchTeamCode);
      dispatcher.success(champsData);
    } catch (err) {
      dispatcher.error(err);
    }
  };

  React.useEffect(() => {
    getChampsInitData();
  }, []);

  const getData = (summonerName: string): ChampData => {
    return dataState.champsData.filter(
      (data) => data.summonerName === summonerName,
    )[0];
  };

  const buyItems = async (summonerName: string, items: string[]) => {
    try {
      dispatcher.loading();

      const purchaserData = getData(summonerName);
      gameDataManager.buyItems(purchaserData, items);

      const socketData: SocketItemData = {
        summonerName,
        championName: purchaserData.champName,
        itemNames: items,
        type: 'ITEM',
        method: 'BUY',
      };

      stomp.current.send(
        `/pub/comm/item/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const cancelItem = async (summonerName: string, itemName: string) => {
    try {
      dispatcher.loading();

      const purchaserData = getData(summonerName);
      gameDataManager.cancelItem(purchaserData, itemName);

      const socketData: SocketItemData = {
        summonerName,
        championName: purchaserData.champName,
        itemNames: [itemName],
        type: 'ITEM',
        method: 'DELETE',
      };

      stomp.current.send(
        `/pub/comm/item/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const countSpellTime = (summonerName: string, spellKey: SpellKey, totalTime) => {
    if (spellTimer.current.includes(summonerName + spellKey)) return;
    spellTimer.current.push(summonerName + spellKey);
    const cnt = totalTime;

    const timer = setInterval(() => {
      if (!cnt || cnt < 0) {
        clearInterval(timer);
        const idx = spellTimer.current.indexOf(summonerName + spellKey);
        spellTimer.current.splice(idx, 1);
      }
      dispatcher.count(summonerName, spellKey);
    }, 1000);
  };

  const updateUltLevel = async (summonerName: string, level: number) => {
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

  const onUseSpell = async (
    summonerName: string,
    spellType: SpellKey,
    timeGap: number = 0,
  ) => {
    try {
      dispatcher.loading();

      const userData = getData(summonerName);
      const ultLevel = userData.spells.R.level;
      if (spellType === 'R' && ultLevel === 0) {
        updateUltLevel(summonerName, 1);
      }
      const { data } = await axios.get(
        `https://backend.swoomi.me/champion/calcedCooltimeInfo?summonerName=${summonerName}&ultLevel=${ultLevel}`,
      );

      if (!data.success) throw new Error();
      const spellTimes = data.data;

      const spellTime = spellTimes[`cooltime${spellType}`];

      const spellTimeUpdated = spellTime - timeGap < 0 ? null : spellTime - timeGap;
      gameDataManager.useSpell(userData, spellType, spellTimeUpdated);

      const socketData: SocketSpellData = {
        summonerName,
        changedSpell: spellType,
        dspellTime: userData.spells.D.time,
        fspellTime: userData.spells.F.time,
        ultTime: userData.spells.R.time,
        type: 'SPELL',
      };

      stomp.current.send(
        `/pub/comm/message/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      countSpellTime(summonerName, spellType, spellTimeUpdated);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const resetSpell = async (summonerName: string, spellType: SpellKey) => {
    try {
      dispatcher.loading();

      const userData = getData(summonerName);
      gameDataManager.resetSpell(userData, spellType);

      const socketData: SocketSpellData = {
        summonerName,
        changedSpell: spellType,
        dspellTime: userData.spells.D.time,
        fspellTime: userData.spells.F.time,
        ultTime: userData.spells.R.time,
        type: 'SPELL',
      };

      stomp.current.send(
        `/pub/comm/message/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const updateTimeUsed = async (
    summonerName: string,
    spellType: SpellKey,
    changedTime: number,
  ) => {
    try {
      dispatcher.loading();

      const userData = getData(summonerName);
      gameDataManager.updateSpellTime(userData, spellType, changedTime);

      const socketData: SocketSpellData = {
        summonerName,
        changedSpell: spellType,
        dspellTime: userData.spells.D.time,
        fspellTime: userData.spells.F.time,
        ultTime: userData.spells.R.time,
        type: 'SPELL',
      };

      stomp.current.send(
        `/pub/comm/message/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );
      countSpellTime(summonerName, spellType, changedTime);
      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
    }
  };

  const providerValue = {
    gameData: dataState.champsData,
    loadingState: { loading: dataState.loading, error: dataState.error },
    isNotClickedInFiveSec,
    buyItems,
    cancelItem,
    onUseSpell,
    resetSpell,
    updateTimeUsed,
    updateUltLevel,
    updateGameData: (gameData) => dispatcher.success(gameData),

    isItemSelectorVisible: !!itemSelectingSummonerName,
    itemSelectingSummonerName,
    setItemSelectingSummonerName,
  };

  const openSocket = () => {
    if (socket.current) return;
    try {
      socket.current = new SockJS('https://backend.swoomi.me/ws-swoomi');
      stomp.current = Stomp.over(socket.current);

      stomp.current.connect({}, () => {
        stomp.current.subscribe(`/sub/comm/room/${matchTeamCode}`, (msg) => {
          const data: SocketSpellData = JSON.parse(msg.body);

          const { summonerName, changedSpell: spellType } = data;
          let chagnedTime;
          switch (spellType) {
            case 'R':
              chagnedTime = data.ultTime;
              break;
            case 'D':
              chagnedTime = data.dspellTime;
              break;
            case 'F':
              chagnedTime = data.fspellTime;
              break;
            default:
              chagnedTime = 0;
          }

          dispatcher.update(data);
          countSpellTime(summonerName, spellType, chagnedTime);
        });

        stomp.current.subscribe(`/sub/comm/item/${matchTeamCode}`, (msg) => {
          const data: SocketSpellData = JSON.parse(msg.body);

          console.log(data);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (socket.current) return;
    openSocket();
  }, []);

  useEffect(() => {
    curtainTimer.current = setTimeout(() => {
      curtainTimer.current = null;
      setIsNotClickedInFiveSec(true);
    }, 5000);

    return () => {
      if (curtainTimer.current) {
        clearTimeout(curtainTimer.current);
        setIsNotClickedInFiveSec(false);
      }
    };
  }, [dataState]);

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
