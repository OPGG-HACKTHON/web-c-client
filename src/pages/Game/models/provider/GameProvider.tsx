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
import NoSleep from 'nosleep.js';
import { reducer, createDispatcher, initState } from './reducer';
import GameContext from '../context/GameContext';
import gameDataManager from '../managers/gameDataManager';
import {
  ChampData, SocketDragonData, SocketItemData, SocketSpellData, SocketUltData, SpellKey,
} from '../type';

interface GameProviderProps {
  matchTeamCode: string;
  children: ReactElement;
}

function GameProvider({ matchTeamCode, children }: GameProviderProps) {
  const [dataState, dispatch] = useReducer(reducer, initState);
  const [dragonCnt, setDragonCnt] = useState(0);
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
    const noSleep = new NoSleep();
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
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

  const countSpellTime = (summonerName: string, spellKey: SpellKey) => {
    if (spellTimer.current.includes(summonerName + spellKey)) return;
    spellTimer.current.push(summonerName + spellKey);

    const timer = setInterval(() => {
      dispatcher.count(summonerName, spellKey, timer, spellTimer.current);
    }, 1000);
  };

  const updateUltLevel = async (summonerName: string, level: number) => {
    const userData = getData(summonerName);
    const preData = userData.spells.R.level;
    try {
      gameDataManager.updateUltLevel(userData, level);

      const socketData: SocketUltData = {
        summonerName,
        type: 'ULT',
        ultLevel: level,
      };

      stomp.current.send(
        `/pub/comm/ult/${matchTeamCode}`,
        {},
        JSON.stringify(socketData),
      );

      dispatcher.render();
    } catch (err) {
      dispatcher.error(err);
      gameDataManager.updateUltLevel(userData, preData);
    }
  };

  const updateDragonCnt = (cnt: number) => {
    if (cnt < 0 || cnt > 4) return;

    const socketData: SocketDragonData = {
      matchTeamCode,
      dragonCount: cnt,
    };

    stomp.current.send(
      `/pub/comm/dragon/${matchTeamCode}`,
      {},
      JSON.stringify(socketData),
    );
    setDragonCnt(cnt);
  };

  const getTotalSpellTime = async (summonerName: string,
    spellType: SpellKey, timeGap: number = 0): Promise<number> => {
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
    return spellTimeUpdated;
  };

  const onUseSpell = async (
    summonerName: string,
    spellType: SpellKey,
    timeGap: number = 0,
  ) => {
    try {
      const totalSpellTime = await getTotalSpellTime(summonerName, spellType, timeGap);
      const userData = getData(summonerName);
      gameDataManager.useSpell(userData, spellType, totalSpellTime);
      dispatcher.render();

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

      countSpellTime(summonerName, spellType);
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
      countSpellTime(summonerName, spellType);
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
    dragonCnt,
    updateDragonCnt,
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

          dispatcher.update(data);
          countSpellTime(summonerName, spellType);
        });

        stomp.current.subscribe(`/sub/comm/item/${matchTeamCode}`, (msg) => {
          const data: SocketItemData = JSON.parse(msg.body);
          const { summonerName, method, itemNames } = data;
          dispatcher.updateItem(summonerName, itemNames, method);
        });

        stomp.current.subscribe(`/sub/comm/ult/${matchTeamCode}`, (msg) => {
          const data: SocketUltData = JSON.parse(msg.body);
          const { summonerName, ultLevel } = data;
          dispatcher.updateUltLevel(summonerName, ultLevel);
        });

        stomp.current.subscribe(`/sub/comm/dragon/${matchTeamCode}`, (msg) => {
          const data: SocketDragonData = JSON.parse(msg.body);
          setDragonCnt(data.dragonCount);
        });

        stomp.current.subscribe(`/sub/comm/newUser/${matchTeamCode}`, (msg) => {
          const data: SocketDragonData = JSON.parse(msg.body);
          console.log(data);
        });
        const socketData = {
          summonerName: '1',
        };
        stomp.current.send(
          `/pub/comm/newUser/${matchTeamCode}`,
          {},
          JSON.stringify(socketData),
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (socket.current) return;
    openSocket();
  }, [socket.current]);

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
